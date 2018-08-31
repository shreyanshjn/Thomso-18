import React from 'react';
import FetchApi from '../../../utils/FetchAPI';
import AuthService from '../../../handlers/main/AuthService';

export default class UpdateImage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            disabled:true,
            errors:''
      };
        this.Auth = new AuthService();
      }
    
      onSubmit =(e)=> {
        e.preventDefault();
        console.log(this.state)
        if(this.state.file.size > 101200){
            this.setState({disabled: true, errors: 'Max image sixe of 100 kb exceeded'})
        }else{
            let data = {
                image: this.state.imagePreviewUrl,
                format: this.state.file.type
            }
            console.log(data)
            const token = this.Auth.getToken()
            this.setState({disabled: true, errors: ''});
            FetchApi('post', '/api/main/updateImage', data, token)
            .then(r => r.data.success ? this.props.imageUpdated(true) : this.props.imageUpdated(false))
           .catch(err => console.log(err));
        }
      }
    
      onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        console.log(e.target.name, 'sdds',e.target.value)
        this.setState({ [name]: value , disabled:false});
        }

      handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
          this.props.imagePrev(reader.result);
        }
    
        reader.readAsDataURL(file)
      }
    
      render() {
        let {imagePreviewUrl, errors,disabled } = this.state;
        return (
          <div>
              {errors ?
                <div style={{ textAlign: 'center', color: 'red', fontWeight: '600' }}>
                    {errors}
                </div>
                : null
            }
            <form onSubmit={this.onSubmit}>
              <div>
                <span>Chose File</span>
                <input 
                name="file"
                type="file"
                onChange={this.onChange}
                accept="" />
              </div>
              
              <button type="submit"  disabled={disabled}> Upload</button>
            </form>
            <small>{this.state.errors}</small>
          </div>
        )
      }
}