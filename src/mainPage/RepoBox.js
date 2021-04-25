import styles from "./style.module.css";


const RepoBox = ({repo, index}) => {

    return (
        <div className={styles.contentResult}>
            <div className={styles.infoRepo}>
                <div className={styles.contentInfoRepo}>
                    <div>
                        <div>
                            <h2 style={{marginBottom: "0"}}>
                                {index}. Nazwa: <span style={{color: "#43D7E2", fontSize: "27px"}}>{repo.name}</span>
                            </h2>
                            <p style={{color: "#979797", marginTop: "0"}}>Pełna nazwa: {repo.full_name}</p>
                        </div>
                        <div>
                            <p><b>Opis:</b> {repo.description!==null?repo.description:"Brak opisu."}</p>
                            <p><b>Link do repozytorium:</b> <a href={repo.html_url}>{repo.name}</a></p>
                        </div>
                    </div>

                    <div className={styles.dateAndStars}>
                        <div>
                            <p><b>Stworzono:</b> {(new Date(repo.created_at).toLocaleString())}</p>
                            <p><b>Ostatnia aktualizajca:</b> {(new Date(repo.updated_at).toLocaleString())}</p>
                        </div>
                        <div>
                            <p><b>Liczba gwiazdek:</b> {repo.stargazers_count}</p>
                            <p><b>Otwarte zadania:</b> {repo.open_issues_count}</p>
                        </div>
                    </div>
                    <div><p><b>Licencja:</b> {repo.license!==null?repo.license.name:"Brak informacji."}</p></div>
                </div>
            </div>
        </div>
    )
}

export default RepoBox