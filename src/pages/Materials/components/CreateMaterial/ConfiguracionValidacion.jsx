

export const ValidarConfiguracionCampo = (nameCampo, configurationInputs) => {
    let respuesta = {
        existeCampo:false,
        isEnabled:false,
        isVisible:false,
        isRequired:false
    }
    let campo = configurationInputs.filter(el => el.campo === nameCampo);
    if(campo.length > 0){
        respuesta.existeCampo = true;
        respuesta.isEnabled = campo[0].isEnabled;
        respuesta.isVisible = campo[0].isVisible;
        respuesta.isRequired = campo[0].isRequired;
    }else{
        respuesta.existeCampo = false;
        respuesta.isEnabled = false;
        respuesta.isVisible = false;
        respuesta.isRequired = false;
    }
    
    return respuesta;
    
}