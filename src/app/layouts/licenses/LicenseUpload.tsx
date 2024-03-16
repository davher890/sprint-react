import React, { useState } from "react";
import { connect } from "react-redux";

import { Grid } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import Spinner from '../../components/custom/Spinner'

import { uploadLicenses } from "../../redux/actions/licenses";

const LicenseUpload: React.FC<any> = (props) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      console.log("Uploading file...");
      props.uploadLicenses(file)
    }
  };

  return (
    <>
      {/* <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div> */}
      <Grid container direction="column">
        { props.loading ? <Spinner/> : 
          <Grid item xs> 
            <div>
              <form id="fileUploadForm" encType="multipart/form-data">
                <input type="file" id="fileInput" name="file" onChange={handleFileChange} />
              </form>
            </div>
            {file && (
              <section>
                Detalles del archivo:
                <ul>
                  <li>Nombre: {file.name}</li>
                  <li>Tipo: {file.type}</li>
                  <li>Tamaño: {file.size} bytes</li>
                </ul>
              </section>
            )}

            {file && <button onClick={handleUpload}>Subir archivo</button>}
          </Grid>
        }
        { props.job_result_log && props.job_result_log.errorMessages && props.job_result_log.errorMessages.length > 0 && 
          <Grid item xs>
            <ul>
              { props.job_result_log.errorMessages.map((message:string) => {
                  return <Alert severity="error">{message}</Alert>
              })
              }
            </ul>
          </Grid>
        }
        { props.job_result_log && props.job_result_log.infoMessages && props.job_result_log.infoMessages.length > 0 && 
          <Grid item xs>
            <ul>
              { props.job_result_log.infoMessages.map((message:string) => {
                  return <Alert severity="success">{message}</Alert>
              })
              }
            </ul>
          </Grid>
        }
      </Grid>
    </>
  );
};

function mapStateToProps(state: any) {
	return {
		job_result_log: state.api_reducer.job_result_log,
    loading: state.api_reducer.loading
	};
}

// Object of action creators
const mapDispatchToProps = {
	uploadLicenses
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LicenseUpload);