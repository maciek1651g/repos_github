import styles from './style.module.css';
import React from "react";

const InputField = ({type="text", text, eyeIco, noEyeIco, id, value, setValue}) => {
    const [showEyeState, setShowEyeState] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState(type);
    let isPassword = false;
    if(type==="password" && eyeIco && noEyeIco)
    {
        isPassword = true;
    }
    const changeIco = () => {
        setShowEyeState(!showEyeState);
        if(showPassword==="password")
        {
            setShowPassword("text")
        }
        else
        {
            setShowPassword("password")
        } 
    }

    const onChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className={styles.loginBox}>
            <input id={id} type={showPassword} className={styles.loginInput} value={value} onChange={onChange} required/>
            <span className={styles.linkInput}>https://github.com/</span>
            <span className={styles.placeHolder}>{text}</span>
            {isPassword ? <span onClick={changeIco}>{isPassword ? (showEyeState ? eyeIco : noEyeIco) : null}</span> : null}
        </div>
    )
}

export default InputField;