import React from 'react';

const Champion = (props) => {
    return(
            <div>
                <a
                    rel="noopener noreferrer"
                    href={"https://google.com"}
                    target="_blank"
                    title={"Test Champion"}>
                        <img
                            src={"http://ddragon.leagueoflegends.com/cdn/9.21.1/img/profileicon/0221.png"}
                        />
                </a>
                <h2>
                    <a
                        rel="noopener noreferrer"
                        href="https://google.com"
                        target="_blank"
                        title={"Test Champion Name"}>
                            {"Test Champion Name"}
                        </a>
                </h2>
            </div>
    );
}

export default Champion;