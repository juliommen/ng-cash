import { Prisma } from '@prisma/client'
import prisma from '../lib/prismaClient'

export const prismaErrors = Prisma.PrismaClientKnownRequestError

export async function createUser(username: string, password: string) {
  try {
    await prisma.account.create({
      data: {
        balance: 100.0,
        user: {
          create: {
            username,
            password,
          },
        },
      },
    })
    await prisma.$disconnect()
    return 'ok'
  } catch (e) {
    await prisma.$disconnect()
    if (e instanceof prismaErrors) {
      if (e.code === 'P2002') {
        return 'Username already used.'
      }
    }
    return 'Unknown database error.'
  }
}

export async function verifyUserOnDb(username: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })
    if (user) {
      if (user.password !== password) {
        await prisma.$disconnect()
        return 'Incorrect password.'
      }
    } else {
      await prisma.$disconnect()
      return 'User not found.'
    }
    await prisma.$disconnect()
    return 'ok'
  } catch (e) {
    await prisma.$disconnect()
    return 'Unknown database error.'
  }
}

export async function getUserData(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })
  const account = await prisma.account.findUnique({
    where: {
      id: user!.accountId,
    },
  })
  const transactions = await prisma.transaction.findMany({
    where: {
      OR: [
        {
          creditedAccountId: user!.accountId,
        },
        {
          debitedAccountId: user!.accountId,
        },
      ],
    },
    include: {
      debitedAccount: {
        select: { user: { select: { username: true } } },
      },
      creditedAccount: {
        select: { user: { select: { username: true } } },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
  await prisma.$disconnect()

  const formattedTransactions = transactions.map((transaction) => {
    let userEnvolved
    let type
    if (account?.id === transaction.creditedAccountId) {
      type = 'income'
      userEnvolved = transaction.debitedAccount.user!.username
    } else {
      type = 'outcome'
      userEnvolved = transaction.creditedAccount.user!.username
    }
    return {
      id: transaction.id,
      userEnvolved,
      type,
      value: transaction.value.toNumber(),
      createdAt: transaction.createdAt.toISOString().split('T')[0],
    }
  })

  const formattedBalance = account?.balance.toNumber()

  return { transactions: formattedTransactions, balance: formattedBalance }
}

export async function makeTransfer(
  usernameOrigin: string,
  usernameDestiny: string,
  value: number,
) {
  const userDestiny = await prisma.user.findUnique({
    where: {
      username: usernameDestiny,
    },
  })
  if (!userDestiny) {
    await prisma.$disconnect()
    return 'User destiny not found.'
  }

  const userOrigin = await prisma.user.findUnique({
    where: {
      username: usernameOrigin,
    },
  })
  if (!userOrigin) {
    await prisma.$disconnect()
    return 'User origin not found.'
  }

  let transaction
  try {
    transaction = await prisma.transaction.create({
      data: {
        value,
        creditedAccountId: userDestiny.accountId,
        debitedAccountId: userOrigin.accountId,
      },
    })
  } catch (e) {
    await prisma.$disconnect()
    return 'Failed to create transaction.'
  }

  let accountOrigin
  try {
    accountOrigin = await prisma.account.update({
      where: {
        id: userOrigin.id,
      },
      data: {
        balance: {
          decrement: value,
        },
      },
    })
  } catch (e) {
    await prisma.$disconnect()
    return 'Failed to update account balance from origin.'
  }

  try {
    await prisma.account.update({
      where: {
        id: userDestiny.id,
      },
      data: {
        balance: {
          increment: Number(value),
        },
      },
    })
  } catch (e) {
    await prisma.$disconnect()
    return 'Failed to update account balance from destiny.'
  }

  await prisma.$disconnect()

  const formattedNewTransaction = {
    id: transaction.id,
    userEnvolved: userDestiny.username,
    type: 'outcome',
    value: transaction.value.toNumber(),
    createdAt: transaction.createdAt.toISOString().split('T')[0],
  }

  const formattedBalance = accountOrigin.balance.toNumber()

  return {
    createdTransaction: formattedNewTransaction,
    newBalance: formattedBalance,
  }
}
