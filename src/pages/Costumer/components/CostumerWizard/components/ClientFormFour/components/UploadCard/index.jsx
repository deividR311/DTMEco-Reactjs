import { Button, Grid } from '@material-ui/core';
import React from 'react';

const UploadCard = ({
    classes, fileDescriptions, IconUpload, value,
    inputId, handleChange, nameFile, attachment, isAttachment,
    generalDisabled
}) => {
    return (
        <>
            <div className={classes.fileDivCTN}>
                <div className={classes.fileDivContent}>
                    <Grid container>
                        <Grid item xs={4} className={classes.ctnIcon}>
                            <span><img className={classes.iconUpload} src={IconUpload} alt="IconUpload"/></span>
                        </Grid>
                        <Grid item xs={8} className={classes.CTNContent}>
                            <li className="">{fileDescriptions.descriptionFile}</li>
                            <label className={classes.nameFile} htmlFor={`contained-button-file${inputId}`}>
                                { !isAttachment && nameFile === '' ?
                                    <strong>No hay archivos cargados</strong> : <strong>{nameFile}</strong>
                                }
                                { isAttachment && nameFile === '' &&
                                    <>
                                        { attachment === '' ?
                                            <strong>No hay archivos cargados</strong>
                                            :
                                            <a href={attachment} target="_blank" rel="noopener noreferrer"> 
                                                <strong>Documento adjunto</strong>
                                            </a>
                                        }
                                    </> 
                                }
                            </label><br />
                            <input
                                accept=".pdf"
                                className={classes.inputFile}
                                id={`contained-button-file${inputId}`}
                                multiple
                                type="file"
                                disabled={generalDisabled}
                                onChange={handleChange}
                            />
                            <label htmlFor={`contained-button-file${inputId}`}>
                                <Button disabled={generalDisabled} component="span" color="primary" className={classes.uploadFile} variant="outlined">
                                    Subir archivo
                                </Button>
                            </label>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default UploadCard;
