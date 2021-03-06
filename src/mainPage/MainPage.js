import LoadingScreen from "./LoadingScreen";
import React from "react";
import InputField from "./InputField";
import styles from './style.module.css';
import ClientAPI from '../clientAPI/ClientAPI.js';
import {useHistory, useLocation, useParams} from "react-router";
import OwnerBox from "./OwnerBox";
import RepoBox from "./RepoBox";
import ErrorMessage from "./ErrorMessage";

//const $ = (id) => document.getElementById(id);

const MainPage = () => {
    const [showLoading, setLoading] = React.useState(false);
    const [userName, setUserName] = React.useState("");
    const [owner, setOwner] = React.useState(null);
    const [repos, setRepos] = React.useState(null);
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [returnTopButton, setReturnTopButton] = React.useState(false);
    const history = useHistory();
    const location = useLocation();
    const {id} = useParams();

    const clickedSearchButton = (event) => {
        event.preventDefault();
        if(userName!=="")
        {
            if(id===userName)
            {
                sendRequestRepos(userName)
            }
            else
            {
                history.push("/"+userName);
            }
        }
    }

    const sendRequestRepos = (name) => {
        setLoading(true);
        const api = new ClientAPI();
        api.onSuccessFunction = successGetRepos;
        api.onErrorFunction = errorGetRepos;
        api.getAllRepos(name);
    }

    const sendRequestUser = (name) => {
        const api = new ClientAPI();
        api.onSuccessFunction = (owner)=>{setOwnerAndRepos([],owner)};
        api.onErrorFunction = errorGetRepos;
        api.getUserInfo(name);
    }

    const setOwnerAndRepos = (repos, owner) => {
        setRepos(repos);
        setOwner(owner);
        setLoading(false);
    }

    const successGetRepos = (data) => {
        if(data.length===0)
        {
            sendRequestUser(id);
        }
        else
        {
            data.sort((a,b)=>b.stargazers_count-a.stargazers_count)
            setOwnerAndRepos(data, data[0].owner);
        }
    }
    const errorGetRepos = (error) => {
        setErrorMessage("Kod b????du: "+error.errorCode+". "+error.errorText);
        setRepos(null);
        setOwner("Nie znaleziono u??ytkownika.");
        setLoading(false);
    }

    React.useEffect(() => {
        if(typeof(id)!=="undefined" && id!=="")
        {
            if(id!==userName)
            {
                setUserName(id);
            }
            sendRequestRepos(id)
        }
        else
        {
            if(userName!=="")
            {
                setUserName("");
                setRepos(null);
                setOwner(null);
            }
        }
    }, [location]);

    React.useEffect(() => {
        window.onscroll = () => {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                if(returnTopButton===false)
                {
                    setReturnTopButton(true);
                }
            } else {
                if(returnTopButton===true)
                {
                    setReturnTopButton(false);
                }
            }

            //when we are at the bottom of the page
            // if(window.scrollY + window.innerHeight >= document.body.offsetHeight)
            // {
            //
            // }
        }
    });

    const returnToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div>
            {showLoading ? <LoadingScreen /> : null}
            {errorMessage!==null ? <ErrorMessage message={errorMessage} setMessage={setErrorMessage}/> : null}
            {returnTopButton?<button className={styles.returnTopButton} onClick={returnToTop}>TOP</button>:null}
            <div className="form">
                <form>
                    <InputField id="name" type="text" text="Nazwa u??ytkownika" value={userName} setValue={setUserName}/>
                    <button id="loginButton" className={styles.loginButton + ' ' + styles.buttonStyle} onClick={clickedSearchButton}>SZUKAJ</button>
                </form>
            </div>
            <div id="result" className="result">
                {
                    owner !== null ? typeof(owner)==="object" ?
                        <OwnerBox owner={owner} reposCount={repos!==null?repos.length:0}/> :
                        <p className={styles.pInfo}>{owner}</p>:
                    <p className={styles.pInfo}>Tutaj pojawi?? si?? informacj?? o u??ytkowniku i jego repozytoriach</p>
                }
                {
                    repos !== null ? repos.length!==0 ?
                        repos.map((repo,index)=><RepoBox key={index+1} index={index+1} repo={repo}/>)  :
                        <p className={styles.pInfo}>Brak repozytori??w</p>
                        : null
                }
            </div>
        </div>
    )
}

export default MainPage