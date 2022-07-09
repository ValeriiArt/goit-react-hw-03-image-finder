import s from './Button.module.css'

const Button = ({ nameButton, Click }) => {
    return (
        <div className={s.bntContainer}>
            <button className={s.button} type="button" onClick={Click}>{ nameButton}</button>
        </div>
    )
}

export default Button;