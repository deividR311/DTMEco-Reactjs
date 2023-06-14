import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { visuallyHidden } from '@mui/utils';

export default function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort, head, className } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead style={{ borderRadius: '10px' }} className={className}>
			<TableRow style={{ background: '#5052A3' }}>
				<TableCell padding="checkbox">
				</TableCell>
				<TableCell>
				</TableCell>
				{head.head.map((headCell) => (
					<TableCell
						key={headCell.field}
						sortDirection={orderBy === headCell.field ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.field}
							direction={orderBy === headCell.field ? order : 'asc'}
							onClick={createSortHandler(headCell.field)}
						>
							<span style={{ color: 'white' }}>{headCell.headerName}</span>

							{orderBy === headCell.field ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}