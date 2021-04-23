

const MainPage = () => {
    return (
        <div>
            <div className="ownerInfo">
              <p>nazwa: owner.login, owner.avatar_url, owner.html_url</p>
            </div>
            <div className="contentResult">
              <div className="infoRepo">
                <h2>Nazwa: name</h2>
                <p>Pełna nazwa: full_name</p>
                <p>Opis: description</p>
                <p>url: html_url</p>
                <p>stworzony: created_at</p>
                <p>ostatnia aktualizajca: updated_at</p>
                <p>gwiazdki: stargazers_count</p>
                <p>Otwarte zadania: open_issues_count</p>
                <p>licencja: license.name</p>
              </div>
            </div>
        </div>
    )
}

export default MainPage