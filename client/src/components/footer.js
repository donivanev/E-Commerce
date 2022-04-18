import React from 'react'

const Footer = () => {
    return (
        <footer className="page-footer">
            <div className="container">
                <div className="row">
                    <div className="col l7 s12">
                        <br/>
                        <h5 className="black-text">Enjoyed shopping?</h5>
                        <p className="black-text text-lighten-4">If so then please give a star to the github repo.</p>
                    </div>
                    <div className="col l1 offset-l2 s12">
                        <i className="material-icons" style={{fontSize: "40px"}}>arrow_downward</i>
                        <ul>
                            <li>
                                <a className="grey-text text-lighten-3" href="https://github.com/donivanev/E-Commerce">
                                    <i className="fa fa-github" style={{fontSize: '48px', color: 'black'}}></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright black-text">
                <div className="center">
                    © 2022 E-Commerce
                </div>
            </div>
        </footer>
    )
}

export default Footer