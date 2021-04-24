import styles from "./style.module.css";


const RepoBox = ({repo}) => {

    return (
        <div className={styles.contentResult}>
            <div className={styles.infoRepo}>
                <div className={styles.contentInfoRepo}>
                    <h2>Nazwa: {repo.name}</h2>
                    <p>Pełna nazwa: {repo.full_name}</p>
                    <p>Opis: {repo.description}</p>
                    <p>url: {repo.html_url}</p>
                    <p>stworzony: {(new Date(repo.created_at).toLocaleString())}</p>
                    <p>ostatnia aktualizajca: {(new Date(repo.updated_at).toLocaleString())}</p>
                    <p>gwiazdki: {repo.stargazers_count}</p>
                    <p>Otwarte zadania: {repo.open_issues_count}</p>
                    <p>licencja: {repo.license!==null?repo.license.name:"brak informacji"}</p>
                </div>
            </div>
        </div>
    )
}

export default RepoBox