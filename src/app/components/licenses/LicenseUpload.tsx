import React, { useState } from "react";
import { connect } from "react-redux";

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
      <div>
        <form id="fileUploadForm" encType="multipart/form-data">
          <input type="file" id="fileInput" name="file" onChange={handleFileChange} />
          <button type="button" onClick={handleUpload}>Upload File</button>
        </form>
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && <button onClick={handleUpload}>Upload a file</button>}
    </>
  );
};


function mapStateToProps(state: any) {
	return {
		// table_data: state.table_reducer.table_data,
		// page: state.table_reducer.page,
		// size: state.table_reducer.size,
		// total: state.table_reducer.total
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