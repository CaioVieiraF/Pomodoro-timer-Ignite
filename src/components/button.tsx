interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger' | 'success'
}

export function Button({ variant = 'primary' }: ButtonProps) {
    return <button>Enviar</button>
}
