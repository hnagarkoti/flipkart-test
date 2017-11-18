import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppComponent />
      </div>
    );
  }
}


class AppComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      numChildren: 0,
      notes: [],
      currentNoteText: ''
    }
    this.onAddChild = this.onAddChild.bind(this)
    this.storeData = this.storeData.bind(this)
  }

  storeData(){
    let that = this;
    var myStorage = window.localStorage;
    var notes = that.state.notes;
    myStorage.setItem('notes',JSON.stringify(notes))
  }

  onAddChild(){
    console.log('called');
    let that = this;
    if(that.state.currentNoteText){
      var items = this.state.notes;
      var obj = {
        id: that.state.numChildren,
        message: that.state.currentNoteText
      }
      var arr = [];
      arr.push(obj)
      items.push(arr)
      this.setState({
        numChildren: that.state.numChildren + 1,
        notes: items,
        // currentText: ''
      });
    }

  }
  handleUserInput(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value})
  }

  createSubNote(index){
    let that = this;
    console.log('createSubNote called',index);
    var notes = this.state.notes;
    var obj = {
        id: index + ''+index,
        message: that.state.currentNoteText+''
    }
    var arr = [];
    arr.push(obj)
    notes[index].push(arr)
    that.setState({
      notes
    })
  }

  deleteParentNote(index){
    let that = this;
    var notes = this.state.notes;
    if (true) {
        console.log('in:;--- ',index);
        notes.splice(index, 1);
    }
    this.setState({
      notes: notes
    })
    console.log('new notes arr:- ', notes);
  }

  addNewSubnoteChild(parentIndex, childIndex){
    let that = this;
    var notes = this.state.notes;
    console.log('addNewSubnoteChild:- ',parentIndex, 'childIndex:- ',childIndex);
    console.log('notes:- ', notes[parentIndex]);
    var obj = {
        id: parentIndex + ''+childIndex,
        message: that.state.currentNoteText+''
    }
    var arr = []
    arr.push(obj)
    notes[parentIndex][childIndex].push(arr)
    that.setState({
      notes
    })
  }

deleteSubnoteChild(parentIndex, childIndex){
  console.log('parentIndex:- ',parentIndex, 'childIndex:- ',childIndex);
  var notes = this.state.notes;
  console.log(notes[parentIndex][childIndex]);
  notes[parentIndex].splice(childIndex, 1);
  console.log('updated notes:- ', notes);
  this.setState({notes})
}

  render () {
    let that = this;
    const children = [];
    return (

      <div className="card calculator">

          <div>

            <input type="text" />
            <button>Search Text</button>
          </div>
          <br></br>
          <br></br><br></br>



        <input type="text" name="currentNoteText" value={this.state.currentText} onChange={(event) => this.handleUserInput(event)}/>
        <p><a href="#" onClick={this.onAddChild}>Add notes and Subnotes</a></p>
        <div id="children-pane">

          {
            this.state.notes.length ? <ChildComponent
                                        notes={that.state.notes}
                                        deleteParentNote={this.deleteParentNote.bind(this)}
                                        createSubNote={this.createSubNote.bind(this)}
                                        addNewSubnoteChild={this.addNewSubnoteChild.bind(this)}
                                        deleteSubnoteChild={this.deleteSubnoteChild.bind(this)}
                                        /> : ''
          }

        </div>
        <button onClick={this.storeData}>Store data to localstorage</button>
      </div>
    );
  }


}

 class ChildComponent extends Component {
   constructor(props){
     super(props)
   }
   render(){
     let that = this;
     console.log('notes:- ', this.props.notes);
     var notes = this.props.notes;
     return(
       <div>
         {
           notes.map((note, index, arr) =>
                 <div key={index}>
                    {/*<Subnote subnote={note} key={index} />*/}
                      <div>

                         <p> Parent Note:- {index} { note[0].message}</p>
                      </div>
                      <div>
                         {
                           note.map(function(subnote, ind, noteParentArr){
                             let htmlArr  = []
                              if(ind !=0){
                                htmlArr.push(<div key={'sub-'+ind}>
                                  Subnote- {ind} : { subnote[0].message}
                                  <button onClick={that.props.deleteSubnoteChild.bind(this,index,ind)}>Delete</button>
                                  <button onClick={that.props.addNewSubnoteChild.bind(this,index,ind)}>New Note</button>
                                  {
                                    subnote.length > 1 ? notes[index][ind].map(function(item, indexVal,arr){
                                      if(indexVal !=0){
                                        return <DisplaySubChildMessage note={item} index={indexVal} key={'ChildnOde'+indexVal}/>
                                      }
                                      else return ''
                                    }) : ''
                                  }
                                </div>)
                              }
                              return htmlArr
                           })

                         }
                      </div>
                      <div>
                         <button onClick={that.props.deleteParentNote.bind(this,index)}>Delete Parent</button>
                         <button onClick={that.props.createSubNote.bind(that,index)}>Create Parent Child Note</button>
                      </div>
                 </div>
            )
         }
       </div>
     )
   }
 }

 class DisplaySubChildMessage extends Component {
   constructor(props) {
     super(props)
   }
   render(){
     console.log('this.props', this.props.note);
     return(
       <div>
         <p>Sub Child Note:- {this.props.note.message  || this.props.note[0].message}</p>
       </div>
     )
   }
 }

 class Subnote extends Component {
   constructor(props) {
     super(props)
   }
   render(){
     return(
       <div>
         <div>
            <p></p>
         </div>
         <div>
            <button>Delete</button>
            <button>New Note</button>
         </div>
       </div>
     )
   }
 }


export default App;
