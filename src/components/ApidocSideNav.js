import React, {useEffect, useState} from 'react'

function ApidocSideNav(props) {
    const data=props.data;

    const [navSearch, setNavSearch] = useState("");
    const [navList, setNavList] =useState({});
    
    useEffect(() => {
        let dropdown = document.getElementsByClassName("apidoc-dropdown-btn");    
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

    const handleNavSearch = (e) => {
        setNavSearch(e.target.value);
    }

    useEffect(() => {
        let result = {};
        Object.keys(data).forEach(tag => {
            if(tag.toLowerCase().startsWith(navSearch.toLowerCase())){
                result[tag]=data[tag];
            } else {
                data[tag].forEach(method => {
                    if(method.type.toLowerCase().startsWith(navSearch.toLowerCase())
                        || method.summary.toLowerCase().startsWith(navSearch.toLowerCase())){
                            if(result.hasOwnProperty(tag)) result[tag].push(method);
                            else result[tag]=[method];
                        }
                });
            }
        });
        setNavList(result);
    },[navSearch])

    const toggleSideNav = () => {
        if(document.getElementById("apidocSideNav").offsetWidth === 0){
            document.getElementById("apidocSideNav").style.width = "300px";
        }
        else{
            document.getElementById("apidocSideNav").style.width = "0";
        }
    }

    return(
        <>
        <button onClick={toggleSideNav} className="apidoc-sidenav-toggle"><i class="fa fa-bars" aria-hidden="true" /></button>
        <div id="apidocSideNav" className="apidoc-sidenav">
            <div className="apidoc-sidenav-searchbar-container">                
                <i className="fa fa-search" aria-hidden="true" />                
                <input 
                    type="text"
                    placeholder="Search"
                    className="apidoc-sidenav-searchbar"
                    value={navSearch}
                    onChange={handleNavSearch}
                />
            </div>
            <div className="apidoc-sidenav-bigtabs">
                <a>Info</a>
                <a>Servers</a>
            </div>
            {
                Object.keys(navList).map(tag => {
                    return(
                        <div key={tag}>
                            <a className="apidoc-dropdown-btn" href="#">{tag}
                                <i className="fa fa-caret-right" style={{float:"right"}} />
                            </a>
                            <div className="apidoc-dropdown-container">
                                {
                                    navList[tag].map(method => {
                                        return(
                                            <a key={method.summary} href="#">
                                                <div className="apidoc-dropdown-opts">
                                                    <div className={`api-dropdown-pill ty-${method.type}`}>{method.type}</div>
                                                    <div>{method.summary}</div>
                                                </div>
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
        </>
    );
}

export default ApidocSideNav;