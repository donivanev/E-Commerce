import React from 'react'

const Footer = () => {
    return (
        <footer class="page-footer">
            <div class="container">
                <div class="row">
                    <div class="col l7 s12">
                        <br/>
                        <h5 class="black-text">Enjoyed shopping?</h5>
                        <p class="black-text text-lighten-4">If so then please give a star to the github repo.</p>
                    </div>
                    <div class="col l1 offset-l2 s12">
                        <i class="material-icons" style={{fontSize: "40px"}}>arrow_downward</i>
                        <ul>
                            <li>
                                <a class="grey-text text-lighten-3" href="https://github.com/donivanev/E-Commerce">
                                    <i class="fa fa-github" style={{fontSize: '48px', color: 'black'}}></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-copyright black-text">
                <div className="center">
                    © 2022 E-Commerce
                </div>
            </div>
        </footer>
    )
}

export default Footer