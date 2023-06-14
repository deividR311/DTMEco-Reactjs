import { useForm } from '../../../hooks/useForm';

export const useSearchMultiple = ( allUserRequestList ) => {
    const [ wordFilter, handleOnChange ] = useForm({
        word: ""
    })
    let requestNumber = [];
    let requestState = [];
    let requestClient = [];
    let requestFiltered = [];

    if (wordFilter.word !== "") {
        requestNumber = allUserRequestList.filter((request) => String(request.id).includes(wordFilter.word));
        requestState = allUserRequestList.filter((request) => request.stateName.includes(wordFilter.word));
        requestClient = allUserRequestList.filter((request) => request.nif.includes(wordFilter.word));

        if (requestNumber.length > 0) {
            requestFiltered = requestNumber;
            if (requestFiltered > 0) {
                requestState = [];
                requestClient = [];
            }
        }

        if (requestNumber.length === 0 && requestState.length > 0) {
            requestFiltered = requestState;
            if (requestFiltered > 0) {
                requestNumber = [];
                requestClient = [];
            }
        }

        if (requestNumber.length === 0 && requestState.length === 0 && requestClient.length > 0) {
            requestFiltered = requestClient;
            if (requestFiltered > 0) {
                requestState = [];
                requestNumber = [];
            }
        }
    } else {
        requestNumber = [];
        requestState = [];
        requestClient = [];
    }

    return [ wordFilter, requestFiltered, handleOnChange ];
}
