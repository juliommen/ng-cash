import { ComponentProps } from 'react'
import ReactLoading from 'react-loading'
import { ButtonBackground, ButtonContainer } from './styles'

interface StyledButtonProps extends ComponentProps<typeof ButtonContainer> {
  buttonText: string
  className?: string
  showLoad?: boolean
}

export function StyledButton({
  buttonText,
  className,
  showLoad = true,
  ...props
}: StyledButtonProps) {
  return (
    <ButtonBackground className={className}>
      <ButtonContainer {...props}>
        {showLoad && props.disabled ? (
          <ReactLoading
            className="loading"
            type="bars"
            color="#000"
            height={20}
            width={20}
          />
        ) : (
          <span>{buttonText}</span>
        )}
      </ButtonContainer>
    </ButtonBackground>
  )
}
