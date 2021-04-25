import ErrorClass from "./ErrorClass";

class ClientAPI
{
    static baseUrl = "https://api.github.com";

    onErrorFunction = null;
    onSuccessFunction = null;

    sendMessage (method, url, jsonData=null, headers = {})
    {
        let xhr = new XMLHttpRequest();
        xhr.open(method.toUpperCase(), ClientAPI.baseUrl+url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
        xhr.timeout = 5000;

        let response = null;

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4)
            {

                if(xhr.status===200)
                {
                    response = xhr.responseText;
                    response = this.jsonToData(response);
                    this.onSuccess(response);
                }
                else
                {
                    if(xhr.status!==0)
                    {
                        response = xhr.responseText;
                        response = this.jsonToData(response);
                        let error = new ErrorClass(xhr.status, xhr.statusText, response.message);
                        this.onError(error);
                        response = null;
                    }
                }
            }
        }
        xhr.ontimeout = (e) => {
            this.onError(new ErrorClass(404, "Zbyt długi czas oczekiwania na odpoweidź"))
        }
        xhr.onabort = (e) => {
            this.onError(new ErrorClass(404, "Zatrzymano zapytanie z nieznanych przyczyn"))
        }
        xhr.onerror = (e) => {
            this.onError(new ErrorClass(404, "Brak Internetu."));
        }

        let headersKeys = Object.keys(headers);
        for(let i=0;i<headersKeys.length;i++)
        {
            let key = headersKeys[i];
            xhr.setRequestHeader(key+"",headers[key]+"");
        }

        xhr.send(jsonData);
    }

    onSuccess(response)
    {
        if(this.onSuccessFunction!==null)
        {
            this.onSuccessFunction(response)
        }
    }

    onError(errorInfo)
    {
        if(this.onErrorFunction!==null)
        {
            this.onErrorFunction(errorInfo);
        }
    }

    dataToJson(data)
    {
        try{
            return JSON.stringify(data);
        } catch(error) {
            this.onError(new ErrorClass(404, "Błąd konwersji danych do typu JSON"));
        }
    }

    jsonToData(jsonData)
    {
        try{
            return JSON.parse(jsonData);
        } catch(error) {
            this.onError(new ErrorClass(404, "Błąd konwersji typu JSON na dane"));
        }
    }


    getRepos(name, page=1, perPage=100)
    {
        this.sendMessage("GET","/users/"+name+"/repos?per_page="+perPage+"&page="+page);
    }

    getAllRepos(name)
    {
        this.getAllReposBackground(name, 1, [], this.onSuccessFunction)
    }

    getAllReposBackground(name, page, response, success)
    {
        this.onSuccessFunction = (data) => {
            response = [...response, ...data]
            if(data.length!==100)
            {
                this.onSuccessFunction=success;
                this.onSuccess(response)
            }
            else
            {
                this.getAllReposBackground(name, page+1,response,success)
            }
        }

        this.getRepos(name, page, 100);
    }

    getUserInfo(name)
    {
        this.sendMessage("GET","/users/"+name);
    }
}


export default ClientAPI;