import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Paper, Container } from "@mui/material";
import { Divider } from '@mui/material';
import axios from "axios";
import { styled } from "@mui/material/styles";
import { makeStyles } from '@mui/styles'

import { useHistory } from "react-router-dom"


const ItemPage = () => {
    let { id } = useParams();
    let history = useHistory();
    if (!id || isNaN(id)) {
        history.push("")
    }
    const [item, setItem] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!isNaN(id)) {
            let params = {
                item_id: id
            }
            axios("https://ms2db.bootando.com/api/items", { params }, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "same-origin",
            }).then((response) => {
                if (response.data.data.length > 0) {
                    setItem(response.data.data[0])
                    setLoaded(true)
                }
                else {
                    history.push("")
                }
            });
        }
        else {
            history.push("")
        }
    }, [])

    // Formats data from lowercase to uppercase and removes underscores
    const formatData = (jobs) => {
        if (jobs) {
            if (!Array.isArray(jobs)) {
                jobs = [jobs]
            }
            var formatted = [];
            jobs.forEach(string => {
                var words = string.split("_")
                words = words.map((word) => {
                    if (word == "none") {
                        return "All"
                    }
                    else {
                        return word[0].toUpperCase() + word.slice(1).toLowerCase();
                    }
                })
                formatted.push(words.join(" "))

            });
            return formatted.join(", ")
        }
    }


    const useStyles = makeStyles((theme) => ({
        divider: {
            background: "#746d6d",
        },
    }));

    const styles = useStyles()

    return (
        <div>
            {!loaded ? <div></div> :
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        margin: "30px",
                    }}
                >
                    <Paper elevation={10} sx={{ width: "30%", height: "60vh", backgroundColor: "#444446" }}>
                        <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
                            <div style={{ fontSize: "20px", color: "lightgrey", paddingBottom: "10px" }}>{item.name}</div>

                            <div style={{ display: "flex" }}>
                                <div>
                                <div
                                    style={{
                                        borderRadius: "3px",
                                        boxShadow: "inset 0 0 15px #232123",
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "fit-content",
                                    }}
                                >
                                    <img
                                        style={{ height: "10vh", width: "10vh" }}
                                        src={`https://ms2db.bootando.com/${item.slot_icon}`}
                                        onError={(e) => { e.target.src = "https://ms2db.bootando.com/item/icon/customize/10400209.png" }}
                                    >
                                    </img>
                                </div>
                                </div>

                                <div className="info" style={{ paddingLeft: "10px", display: "flex", flexDirection: "column", width: "70%", fontSize: "16px", color: "lightgrey", }}>
                                    <div style={{ height: "10vh" }}>
                                        <div>Category: {formatData(item.tab)}</div>
                                        <div>ID: {item.item_id}</div>
                                        <div>Jobs: {formatData(item.jobs)}</div>
                                    </div>
                                    <Divider sx={{ marginBottom: "5px" }} classes={{ root: styles.divider }} />
                                    {/* placeholder for more info here */}
                                    <div>More info here...</div>

                                    <div></div>
                                </div>
                            </div>
                        </div>

                    </Paper>

                </div>
            }
        </div>
    )
}

export default ItemPage
