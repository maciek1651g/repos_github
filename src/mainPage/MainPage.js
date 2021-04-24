import LoadingScreen from "./LoadingScreen";
import React from "react";
import InputField from "./InputField";
import styles from './style.module.css';
import ClientAPI from '../clientAPI/ClientAPI.js';
import {useHistory, useLocation, useParams} from "react-router";
import OwnerBox from "./OwnerBox";
import RepoBox from "./RepoBox";

//const $ = (id) => document.getElementById(id);

const MainPage = () => {
    const [showLoading, setLoading] = React.useState(false);
    const [userName, setUserName] = React.useState("");
    const [owner, setOwner] = React.useState(null);
    const [repos, setRepos] = React.useState(null);
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
        api.functionAfterRequest = afterRequestRepos;
        api.getRepos(name);
    }

    const sendRequestUser = (name) => {
        const api = new ClientAPI();
        api.onSuccessFunction = (owner)=>{setOwnerAndRepos([],owner)};
        api.onErrorFunction = errorGetRepos;
        api.getUserInfo(name);
    }

    const setOwnerAndRepos = (repos, owner) => {
        console.log(owner)
        console.log(repos)
        setRepos(repos);
        setOwner(owner);
    }

    const successGetRepos = (data) => {
        if(data.length===0)
        {
            sendRequestUser(userName);
        }
        else
        {
            data.sort((a,b)=>a.stargazers_count-b.stargazers_count)
            setOwnerAndRepos(data, data[0].owner);
        }
    }
    const errorGetRepos = (error) => {

    }
    const afterRequestRepos = () => {
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
            }
        }
    }, [location]);

    return (
        <div>
            {showLoading ? <LoadingScreen /> : null}
            <div className="form">
                <form>
                    <InputField id="name" type="text" text="Nazwa użytkownika" value={userName} setValue={setUserName}/>
                    <button id="loginButton" className={styles.loginButton + ' ' + styles.buttonStyle} onClick={clickedSearchButton}>SZUKAJ</button>
                </form>
            </div>
            <div id="result" className="result">
                {owner!==null ? <OwnerBox owner={owner}/>:null}
                {repos!==null ? <RepoBox repo={repos[0]}/>:null}
            </div>
        </div>
    )
}

export default MainPage