import styles from "./style.module.css";


const OwnerBox = ({owner}) => {
    return (
        <div className={styles.contentResult}>
            <div className={styles.ownerInfo}>
                <div className={styles.contentInfoOwner}>
                    <div className={styles.contentInfoOwnerLeft}>
                        <div className={styles.avatarOwner}><img src={owner.avatar_url} alt="Avatar" style={{width: "100%", height: "100%"}}/></div>
                    </div>
                    <div className={styles.contentInfoOwnerRight}>
                        <h2 style={{marginLeft: "10px"}}>Właściciel repozytoriów: <span style={{color: "#43D7E2", fontSize: "30px"}}>{owner.login}</span></h2>
                        <p>Link do platformy github: <a href={owner.html_url}>{owner.html_url}</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OwnerBox