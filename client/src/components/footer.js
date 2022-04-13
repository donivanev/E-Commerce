import React from 'react'

const Footer = () => {
    return (
        <footer class="page-footer">
            <div class="container">
                <div class="row">
                    <div class="col l6 s12">
                        <h5 class="white-text">Enjoyed shopping?</h5>
                        <p class="grey-text text-lighten-4">If so then please give a star to the github repo.</p>
                    </div>
                    <div class="col l4 offset-l2 s12">
                        <ul>
                            <li>
                            <i className="material-icons right" style={{fontSize: "50px"}}>arrow_downward</i>
                            </li>
                            <li>
                                <a class="grey-text text-lighten-3" href="https://github.com/donivanev/E-Commerce">
                                    Github repository
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <div className="center">
                    © 2022 E-Commerce
                </div>
            </div>
        </footer>
    )
}

export default Footer