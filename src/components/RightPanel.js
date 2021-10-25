import React, {useEffect} from 'react'
import ReactJson from 'react-json-view'

function RightPanel(props) {
    const data = props.data;
    const requestExample = data.requestBody?.content["application/json"]?.example;
    const responseExamples = Object.keys(data.responses).filter(response => (data.responses[response].hasOwnProperty("content") && data.responses[response].content["application/json"]?.example));
   
    useEffect(() => {
        const dropdown = document.getElementsByClassName("apidoc-dropdown-btn");    
        let i;   
        for (i = 0; i < dropdown.length; i++) {
          dropdown[i].addEventListener("click", function() {
            this.classList.toggle("apidoc-dropdown-active");       
            let dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
              dropdownContent.style.display = "none";
            } else {
              dropdownContent.style.display = "block";
            }
          });
        }        
    });

    return (
        <div key={data.summary} className="apidoc-rp-container">
            <div className="apidoc-rp-path-container apidoc-dropdown-btn">
                <div className={`apidoc-rp-type ty-${data.requestType}`}>{data.requestType}</div>
                <div className="apidoc-rp-path">{data.path}</div>
                <i className="fa fa-caret-right" />
            </div>
            <div className="apidoc-dropdown-container">
                {
                    data.servers.map(server => {
                        return(
                            <div key={server.url} className="apidoc-rp-server">
                                { server.description ?
                                    <div className="apidoc-rp-server-des">{server.description}</div>
                                    : null
                                }
                                <div className="apidoc-rp-server-url">{server.url}<span style={{color:"rgb(146,146,204)"}}>{data.path}</span></div>
                            </div>
                        )
                    })
                }
            </div>
            { requestExample ? 
            <div>
                <h3 style={{color:"white",marginTop:"10px"}}>Request samples</h3>
                <button className="apidoc-rp-pill">Payload</button>
                <div className="apidoc-rp-obj-container">
                    <div className="apidoc-rp-contenttype-container">
                        <div>Content type</div>
                        <div className="apidoc-rp-contenttype">{Object.keys(data.requestBody.content)[0]}</div>
                    </div>
                    <div className="apidoc-rp-example">
                        <ReactJson theme="threezerotwofour" src={requestExample} name={false} displayObjectSize={false} displayDataTypes={false} />                    
                    </div>
                </div>
            </div>
            : 
            null
            }
            { responseExamples.length !== 0 ?
            <div>
                <h3 style={{color:"white",marginTop:"10px"}}>Response samples</h3>
                {
                    responseExamples.map(response => {
                        return (
                            <div key={response}>
                                <button className="apidoc-rp-pill res-pill">{response}</button>
                                <div className="apidoc-rp-obj-container">
                                    <div className="apidoc-rp-contenttype-container">
                                        <div>Content type</div>
                                        <div className="apidoc-rp-contenttype">{Object.keys(data.responses[response].content)[0]}</div>
                                    </div>
                                    <div className="apidoc-rp-example">
                                    <ReactJson theme="threezerotwofour" src={data.responses[response].content["application/json"].example} name={false} displayObjectSize={false} displayDataTypes={false} />                    
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            :
            null
            }
        </div>
    );
}

export default RightPanel;