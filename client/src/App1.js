import "./index.css"
import { useState } from "react";
import QRCode from 'qrcode';

function App() {

  const [inputData, setInputData] = useState({
    url: "",
    size: ""
  });

  const [base64Image, setBase64Image] = useState(null);

  const [alert, setAlert] = useState(false);

  const [generate, setGenerated] = useState(false);

  const onChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = async (event) => {

    try {
      event.preventDefault();
      const qrObject = await QRCode.toDataURL(document.getElementById('final'), inputData.url, { "width": `${inputData.size}`, "rendererOpts.quality": 1 });
      setGenerated(true);
      setBase64Image(qrObject);
    } catch (error) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
        setGenerated(false);
      }, 5000);
    }
  }

  const { url } = inputData;

  return (
    <>
      <center>
        <h1 className="text-4xl m-5">QR CODE GENERATOR</h1>
        <div className="m-5">
          <form onSubmit={onSubmit}>
            <div className="m-5">
              <label className="px-4" htmlFor="url"><b>URL</b></label>
              <input
                type="url"
                className="border border-2 border-black rounded-md px-2"
                placeholder="Enter the URL"
                name="url"
                onChange={onChange}
                value={url}

              />
              <select className="border border-2 border-black mx-2 rounded-md" name="size" id="size" defaultValue={"300"} onChange={onChange} required>
                <option value="100" >100x100</option>
                <option value="200" >200x200</option>
                <option value="300" >300x300</option>
                <option value="400" >400x400</option>
                <option value="500" >500x500</option>
                <option value="600" >600x600</option>
                <option value="700" >700x700</option>
              </select>
              <button className="bg-blue-500 text-white py-1 rounded-md px-2 hover:bg-green-500" type="submit" >generate</button>
              {
                (alert ) && 
                <div class="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800 m-10" role="alert">
                  <span class="font-medium">Info alert!</span> Please enter url.
                </div>
              }
            </div>
          </form>


          <div className="qrImageGenerator">

            { !alert &&
              <canvas id="final" />
            }

          </div>
          {(!alert && generate) && <a className="bg-blue-500 text-white py-1 rounded-md px-2 hover:bg-green-500" download="qr.png" href={base64Image} >Download </a>}
        </div>
      </center>
    </>
  );

}

export default App;
