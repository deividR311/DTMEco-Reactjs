import { Container, Grid, Input, Paper } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import CostumerContext from '../../../../../../context/Costumer/costumerContext';
import { useForm } from '../../../../../../hooks/useForm';
import { RegexTextFieldCommon, SelectCommon } from '../../../../../../sharedComponents';
import { ContacForm } from './components';

const ClientFormTwo = ({
  classes, saleNames, saleFormNames, salesInfo, handleSaleChange, salesList,
  state, didSubmitSale, requestById, generalDisabled, fullData, setSalesInfo,
  setValidateEmailSales, didSubmitContact, setDidSubmitContact
}) => {
  const salesOrganization = salesList.filter((item) => item.id === (requestById !== '' ? requestById.codePartrnership : state.dataRequest.codePartnership))
  const channelOrganization = salesOrganization.length > 0 ? salesOrganization[0].subValues[0].subValues : [];
  const sectorOrganization = salesInfo.canalCode !== '' && channelOrganization.filter((item) => item.id === salesInfo.canalCode);
  const salesTansport = fullData[10].list.length > 0 ? fullData[10].list[0].values : [];
  const salesZone = fullData[11].list.length > 0 ? fullData[11].list[0].values : [];
  const listFunctions = fullData[12].list[0].values;
  const [disabledChannel, setDisabledChannel] = useState(true);
  const [disabledSector, setdisabledSector] = useState(true);
  const [validateEmail, setvalidateEmail] = useState(false);
  const costumerContext = useContext(CostumerContext);
  const {
    loadFucntionCostumerList,
    costumerFunctionList
  } = costumerContext;

  useEffect(() => {
    validFunction();
  }, [salesInfo.canalCode]);

  useEffect(() => {
    validFunction();
  }, [salesInfo.sectorCode]);

  const validFunction = () => {
    if (salesInfo.canalCode !== '' && salesInfo.sectorCode !== '') {
      loadFucntionCostumerList(salesInfo.canalCode, salesInfo.sectorCode);
    }
  }

  const regexEmailOnChange = (name, value, isEmail) => {
    setValidateEmailSales(isEmail);
    setSalesInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  useEffect(() => {
    if (salesInfo.salesOrganizationCode !== '') {
      setDisabledChannel(false)
    } else {
      setDisabledChannel(true)
    }
  }, [salesInfo.salesOrganizationCode])

  useEffect(() => {
    if (salesInfo.canalCode !== '') {
      setdisabledSector(false)
    } else {
      setdisabledSector(true)
    }
  }, [salesInfo.canalCode])

  return (
    <>
      <div className={classes.ctnFormTwo}>
        <Grid container>
          <Grid item xs={3}>
            <SelectCommon
              label={saleNames.saleOrganization}
              name={saleFormNames.salesOrganizationCode}
              classes={classes}
              value={salesInfo.salesOrganizationCode}
              selectOptions={salesOrganization.length > 0 ? salesOrganization[0].subValues : []}
              handleChange={handleSaleChange}
              required={didSubmitSale}
              disabled={generalDisabled}
              otherStyle={true}
              withCode={true}
            />
          </Grid>
          <Grid item xs={3}>
            <SelectCommon
              label={saleNames.channel}
              name={saleFormNames.canalCode}
              classes={classes}
              value={salesInfo.canalCode}
              selectOptions={channelOrganization}
              handleChange={handleSaleChange}
              required={didSubmitSale}
              disabled={generalDisabled ? generalDisabled : disabledChannel}
              otherStyle={true}
              withCode={true}
            />
          </Grid>
          <Grid item xs={3}>
            <SelectCommon
              label={saleNames.sector}
              name={saleFormNames.sectorCode}
              classes={classes}
              value={salesInfo.sectorCode}
              selectOptions={sectorOrganization.length > 0 ? sectorOrganization[0].subValues : []}
              handleChange={handleSaleChange}
              required={didSubmitSale}
              disabled={generalDisabled ? generalDisabled : disabledSector}
              otherStyle={true}
              withCode={true}
            />
          </Grid>
          {/* Zona de ventas */}
          {<Grid item xs={3}>
            <Grid item xs={3}>
              <SelectCommon
                label={saleNames.saleZone}
                name={saleFormNames.saleZone}
                classes={classes}
                value={salesInfo.salesAreaCode}
                selectOptions={salesZone}
                handleChange={handleSaleChange}
                required={didSubmitSale}
                disabled={generalDisabled}
                otherStyle={true}
                withCode={true}
              />
            </Grid>
          </Grid>}
        </Grid>
        {/* Zona de transporte  */}
        {<Grid container>
          <SelectCommon
            label={saleNames.transporZone}
            name={saleFormNames.transporZone}
            classes={classes}
            value={salesInfo.transportZoneCode}
            selectOptions={salesTansport}
            handleChange={handleSaleChange}
            required={didSubmitSale}
            disabled={generalDisabled}
            otherStyle={true}
            withCode={true}
          />
        </Grid>}

        {costumerFunctionList !== '' && costumerFunctionList !== 0 ? <Grid container>
          <Grid container>
            <Grid item xs={6}>
              <h5 className={classes.rolesTitle}><b>Información de contacto</b></h5>
            </Grid>
          </Grid>
          <ContacForm
            form={salesInfo}
            regexEmailOnChange={regexEmailOnChange}
            classes={classes}
            handleSaleChange={handleSaleChange}
            costumerFunctionList={costumerFunctionList}
            listFunctions={listFunctions}
            setSalesInfo={setSalesInfo}
            didSubmitContact={didSubmitContact}
            generalDisabled={generalDisabled}
            setDidSubmitContact={setDidSubmitContact}
          />
        </Grid> : <></>}
      </div>
    </>
  )
}

export default ClientFormTwo;