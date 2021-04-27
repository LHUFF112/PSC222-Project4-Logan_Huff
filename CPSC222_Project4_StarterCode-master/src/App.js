import React from "react";

import Firebase from "firebase";
import config from "./config";

class App extends React.Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(config);

    this.state = {
      students: []
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeUserData();
    }
  }

  writeUserData = () => {
    Firebase.database()
      .ref("/")
      .set(this.state);
    console.log("DATA SAVED");
  };

  getUserData = () => {
    let ref = Firebase.database().ref("/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let name = this.refs.name.value;
    let grade = this.refs.grade.value;
    let uid = this.refs.uid.value;

    if (uid && name && grade) {
      const { students } = this.state;
      const devIndex = students.findIndex(data => {
        return data.uid === uid;
      });
      students[devIndex].name = name;
      students[devIndex].grade = grade;
      this.setState({ students });
    } else if (name && grade) {
      const uid = new Date().getTime().toString();
      const { students } = this.state;
      students.push({ uid, name, grade });
      this.setState({ students });
    }

    this.refs.name.value = "";
    this.refs.grade.value = "";
    this.refs.uid.value = "";
  };

  removeData = student => {
    const { students } = this.state;
    const newState = students.filter(data => {
      return data.uid !== student.uid;
    });
    this.setState({ students: newState });
  };

  updateData = student => {
    this.refs.uid.value = student.uid;
    this.refs.name.value = student.name;
    this.refs.grade.value = student.grade;
  };

  render() {
    const { students } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <h1>Class Gradebook</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              {students.map(student => (
                <div
                  key={student.uid}
                  className="card float-left"
                  style={{ width: "18rem", marginRight: "1rem" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{student.name}</h5>
                    <p className="card-text">{student.grade}</p>
                    <button
                      onClick={() => this.removeData(student)}
                      className="btn btn-link"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => this.updateData(student)}
                      className="btn btn-link"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <h1>Add new student here</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                  <input type="hidden" ref="uid" />
                  <div className="form-group col-md-6">
                    <label>Name</label>
                    <input
                      type="text"
                      ref="name"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Grade</label>
                    <input
                      type="text"
                      ref="grade"
                      className="form-control"
                      placeholder="Grade"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
