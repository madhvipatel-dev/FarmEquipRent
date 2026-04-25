import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Admin_Add_Machinery() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [typeid, setTypeid] = useState("0");
  const [description, setDescription] = useState("");
  const [rday, setRday] = useState("");
  const [imgpath, setImgpath] = useState(null);
  const [type, setType] = useState([]);

  const [error, setError] = useState({});

  // ✅ Handle file
  const handlefile = (e) => {
    setImgpath(e.target.files[0]);
  };

  // ✅ Load types
  useEffect(() => {
    getTypeDetail();
  }, []);

  async function getTypeDetail() {
    try {
      const result = await fetch("http://localhost:5000/gettypedetail");
      const res = await result.json();
      setType(res);
    } catch (err) {
      console.log(err);
      alert("❌ Failed to load types");
    }
  }

  // ✅ Validation
  const handlevalidation = (e) => {
    e.preventDefault();
    let x = {};

    let v1 = /^[a-zA-Z ]{2,50}$/;

    if (!name) x.name = "Enter Machinery Name";
    else if (!v1.test(name)) x.name = "Only alphabets allowed";
    else x.name = "";

    if (typeid === "0") x.typeid = "Select Type";
    else x.typeid = "";

    if (!description) x.description = "Enter Description";
    else x.description = "";

    let v2 = /^[0-9]{1,10}$/;

    if (!rday) x.rday = "Enter Rent";
    else if (!v2.test(rday)) x.rday = "Only numbers allowed";
    else if (parseInt(rday) <= 0) x.rday = "Must be > 0";
    else x.rday = "";

    if (!imgpath) x.imgpath = "Select Image";
    else x.imgpath = "";

    setError(x);

    if (!x.name && !x.typeid && !x.description && !x.rday && !x.imgpath) {
      savemachinery();
    } else {
      alert("❌ Fix errors first");
    }
  };

  // ✅ Save Machinery (FIXED)
  const savemachinery = async () => {
    try {
      let formdata = new FormData();

      formdata.append("name", name);
      formdata.append("typeid", typeid);
      formdata.append("description", description);
      formdata.append("rday", rday);
      formdata.append("image1", imgpath);

      const result = await fetch("http://localhost:5000/savemachinery", {
        method: "POST",
        body: formdata,
      });

      if (!result.ok) {
        throw new Error("Server not responding");
      }

      let res = await result.json();

      alert("✅ Machinery Saved Successfully");
      navigate("/admin_view_machinery");

    } catch (err) {
      console.error(err);
      alert("❌ Failed to connect backend");
    }
  };

  return (
    <div className="contact">
      <div className="container">
        <h3 className="title">ADD MACHINERY</h3>

        <div className="col-md-6">
          <div className="contact-form">
            <form onSubmit={handlevalidation}>

              <input
                type="text"
                placeholder="Enter Machinery Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {error.name && <p style={{ color: "red" }}>{error.name}</p>}

              <select
                value={typeid}
                onChange={(e) => setTypeid(e.target.value)}
              >
                <option value="0">--Select Type--</option>
                {type.map((item) => (
                  <option key={item.type_id} value={item.type_id}>
                    {item.type_name}
                  </option>
                ))}
              </select>
              {error.typeid && <p style={{ color: "red" }}>{error.typeid}</p>}

              <textarea
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {error.description && <p style={{ color: "red" }}>{error.description}</p>}

              <input
                type="text"
                placeholder="Enter Rent Per Day"
                value={rday}
                onChange={(e) => setRday(e.target.value)}
              />
              {error.rday && <p style={{ color: "red" }}>{error.rday}</p>}

              <input type="file" onChange={handlefile} />
              {error.imgpath && <p style={{ color: "red" }}>{error.imgpath}</p>}

              <input type="submit" value="SAVE" />

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin_Add_Machinery;