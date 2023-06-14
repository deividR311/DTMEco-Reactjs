import { useEffect, useState } from "react"
import { AccordionDetails, Grid } from "@material-ui/core"
import MuiAccordion from '@mui/material/Accordion';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

import { styled } from '@mui/material/styles';
import { InputFieldCustom } from "../../../DraftMaterialNoCore/components/CustomInput";

const AccordionSummary = styled((props) => (
	<MuiAccordionSummary
		expandIcon={<ChevronRightIcon sx={{ fontSize: '0.9rem' }} />}
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor:
		theme.palette.mode === 'dark'
			? 'rgba(255, 255, 255, .05)'
			: 'rgba(0, 0, 0, .03)',
	flexDirection: 'row-reverse',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

export const MakeAcordeon = (data = []) => {
	const [servData, setData] = useState([]);
	const [getInfoMaterial, setIdMatrial] = useState({ materialId: '', numberTicket: '' });
	const [expanded, setExpanded] = useState(false);
	useEffect(() => {
		if (data.data.length > 0) {
			setData(data.data);
			const { materialId, ticketNumber } = data.data[0];
			setIdMatrial({ materialId: materialId, numberTicket: ticketNumber })
		}
	}, [data]);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const Accordion = styled((props) => (
		<MuiAccordion disableGutters elevation={0} square {...props} />
	))(({ theme }) => ({
		borderBlockEnd: '1px solid',
		borderBlockColor: '#9F9D9D',
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
		'&:MuiButtonBase-root MuiAccordionSummary-root': {
			background: '#FFFFFF'
		}
	}));

	const styleTable = {
		fecha: {
			width: '26%',
			textAlign: 'center',
		},
		user: {
			width: '28%',
			textAlign: 'center',
		},
		state: {
			width: '16%',
			textAlign: 'center',
		},
	}

	return (
		<>
			<Grid container spacing={4}>
				<Grid item item xs={4}>
					<InputFieldCustom
						label={'Nº de ticket'}
						disabled={true}
						value={getInfoMaterial.numberTicket}
					/>
				</Grid>
				<Grid item xs={4}>
					<InputFieldCustom
						label={'Id'}
						disabled={true}
						value={getInfoMaterial.materialId}
					/>
				</Grid>
			</Grid><br />
			<Grid container >
				<Grid xs={12}>
					<table rules={'all'}>
						<thead style={{ background: '#0F0C5A', color: 'white' }}>
							<th style={{ ...styleTable.fecha }}>Fecha</th>
							<th style={{ ...styleTable.user }}>Usuario</th>
							<th style={{ ...styleTable.state }}>Estado</th>
							<th>Motivo causal rechazo / devolución</th>
						</thead>
						<tbody>
							{
								servData.map((val) => {
									return (
										<tr>
											<td colSpan={4}>
												<Accordion
													expanded={expanded === val.id}
													onChange={handleChange(val.id)}
													sx={{
														backgroundColor: "#FFFFFF"
													}}>
													<AccordionSummary
														expandIcon={<ChevronRightIcon style={{ color: '#0F0C5A', fontSize: '40px' }} />}
														aria-controls="panel1bh-content"
														id="panel1bh-header"
														sx={{
															backgroundColor: "#FFFFFF"
														}}
													>
														<div style={{
															display: 'flex', display: 'flex',
															justifyContent: 'space-around',
															width: '100%'
														}}>
															<Grid container spacing={2}>
																<Grid item xs={3}>
																	{val.dateCreated}
																</Grid>
																<Grid item xs={3}>
																	{val.userName}
																</Grid>
																<Grid item xs={3}>
																	{val.stateName}
																</Grid>
																<Grid item xs={3}>
																	{val.reason || ''}
																</Grid>
															</Grid>
														</div>
													</AccordionSummary>
													<AccordionDetails >
														<span style={{ background: '#EFF4FD', width: '100%', padding: '8px' }}>
															<p style={{ color: '#0E0C5A', fontWeight: 'bold' }}>Observación</p>
															<p>
																{val.observation || ''}
															</p>
														</span>

													</AccordionDetails>
												</Accordion>
											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</Grid>
			</Grid>
		</>
	)
}