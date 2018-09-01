import React from 'react';
import FetchApi from '../../../utils/FetchAPI';
import AuthService from '../../../handlers/ca/temp/AuthService';

export default class UpdateImageCA extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            disabled:true,
            errors:''
      };
      this.handleImageChange = this.handleImageChange.bind(this);
        this.Auth = new AuthService();
      }
    
      onSubmit =(e)=> {
        e.preventDefault();
        if(this.state.file.size > 101200){
            this.setState({disabled: true, errors: 'Max image sixe of 100 kb exceeded'})
        }else{
            let data = {
                image: this.state.imagePreviewUrl,
                format: this.state.file.type
            }
            const token = this.Auth.getToken()
            FetchApi('post','/api/ca/temp/updateImage', data, token)
            .then(res => {
                if(res && res.data && res.data.success){
                  this.setState({disabled: true, errors: ''})
                  this.props.history.push('/CampusAmbassador');
                }
                else{
                  this.setState({disabled: true, errors: 'Unable to upload'})
                }
              })
           .catch(err => {
            console.log(err)
            });
        }
      }

      handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result,
            disabled:false
          });
          this.props.imagePrev(reader.result);
        }
        reader.readAsDataURL(file)
      }
    
      render() {
        let { disabled } = this.state;
        return (
          <div>
            <form onSubmit={this.onSubmit}>
              <div>
                <span>Choose File</span>
                <input 
                name="file"
                type="file"
                onChange={(e)=>this.handleImageChange(e)}
                accept="" />
              </div>
              
              <button type="submit"  disabled={disabled}> Upload</button>
            </form>
            <small>{this.state.errors}</small>
          </div>
        )
      }
}