import * as React from "react"

import { Grid } from '@material-ui/core';

import Select from '../Select'

// Redux
import { connect } from "react-redux";
import { getAllReceipts } from "../../../redux/actions/receipts";

const ReceiptSelect: React.FC<any> = (props) => {

    const [receiptId, setReceiptId] = React.useState<number>(props.receiptId)

    React.useEffect(() => {
        if (props.receiptId !== receiptId){
            setReceiptId(props.receiptId)
        }
        props.getAllReceipts()
    }, [props.receiptId, props.getAllReceipts, receiptId])

    const onChange = (value: String, item: any) => {
        if (props.onChange){
            if (item){
                props.onChange(item.id)
            }
            else {
                props.onChange(null)
            }
        }
    }

    return (
        <Grid container>
            <Grid item xs>
                <Select name="receiptId" label="Remesa" 
                    options={props.receipts} value={receiptId}
                    error={props.error} onChange={onChange}
                />
            </Grid>
        </Grid>
    )
}

const mapDispatchToProps = {
    getAllReceipts
}

const mapStateToProps = (state: any) => {
    return {
        receipts: state.receipt_reducer.receipts,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReceiptSelect);