import React, { useContext,useEffect,useState } from 'react';
import { ProfileContext } from 'contexts/profile/profile.context';
import { Cookies } from 'react-cookie';
import { PROFILE, MOBILE } from 'endpoints';
import axios from 'axios';
import {
  SettingsForm,
  SettingsFormContent,
  HeadingSection,
  Title,
  Row,
  Col,
  Text,
} from './settings.style';
import { Button } from 'components/button/button';
import { Input } from 'components/forms/input';
import { FormattedMessage } from 'react-intl';
import { Label } from 'components/forms/label';
import Contact from 'features/contact/contact';
import Address from 'features/address/address';
import Payment from 'features/payment/payment';
import { CubeGrid } from 'styled-loaders-react';


type SettingsContentProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const SettingsContent: React.FC<SettingsContentProps> = ({ deviceType}) => {
  const { state, dispatch } = useContext(ProfileContext);
  let [username, setUsername] = useState(null);
  let [fname, setFirstName] = useState('');
  let [email, setEmail] = useState(null);
  let [phno, setContactno] = useState('');
  const [saved, setSaved] = useState(false);
  let [validation, setValidation] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  const cookies = new Cookies();
  const fetchData = () => {
    const config = {
      headers: { Authorization: `Bearer  ${cookies.get('access_token')}` }
    };
    axios.get(PROFILE, config)
    .then(res => {
      setUsername(res.data);
      setFirstName(res.data.first_name);
      setEmail( res.data.email);
      setLoading(false);
    })
    axios.get(MOBILE, config)
    .then(res => {
      let max = Math.max(...res.data.map(({ id }) => id))
      setContactno(res.data.find((element)=>element.id===max).mobile)
    })
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    dispatch({
      type: 'HANDLE_ON_INPUT_CHANGE',
      payload: { value, field: name },
    });
  };

  const handleSave = async () => {
    var pattern = new RegExp(/^[0-9\b]+$/);
    var e_pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!e_pattern.test(`${email}`)) {
      setSaved(false);
      setValidation({"email": "Please enter valid email address."});
    }else if (!pattern.test(`${phno}`)) {
      setSaved(false);
      setValidation({"phone": "Please enter only number."});
    }else if(`${phno}`.length != 10){
      setSaved(false);
      setValidation({"phone": "Please enter valid phone number."});
    }
    else {
      setValidation(null)
      const config = {
        headers: { Authorization: `Bearer  ${cookies.get('access_token')}` }
      };
      const Payload = {
        "first_name": `${fname}`,
        "last_name": username.last_name,
        "email": `${email}`,
        "username": username.username
      }
      axios.put(`${PROFILE}${username.id}/`, Payload, config)
        .then(response => {
          setUsername(response.data);
          setSaved(true);
        })
        .catch(err => {
          //TODO display a error message 
          if (err.response) {
            // client received an error response (5xx, 4xx)
          } else if (err.request) {
            // client never received a response, or request never left
          } else {
            // anything else
          }
        });
      const Payload1 = {
        "mobile": `${phno}`
      }
      axios.post(MOBILE, Payload1, config)
        .then(response => {
          setContactno(response.data.mobile);
          setSaved(true);
        })
    }
  };

  return (
    (loading===true) ? <CubeGrid color="#009E7F" size="60px"/> :
    <SettingsForm>
      {(saved === true) ?
      <div style={{color: '#009E7F', height: '50px'}}>
        <h6>Your profile is updated successfully</h6>
      </div> : null}
      <SettingsFormContent>
        <HeadingSection>
          <Title>
            <FormattedMessage
              id='profilePageTitle'
              defaultMessage='Your Profile'
            />
          </Title>
        </HeadingSection>
        <Row style={{ alignItems: 'flex-end', marginBottom: '50px' }}>
          <Col xs={12} sm={5} md={5} lg={5}>
            <Label>
              <FormattedMessage
                id='profileNameField'
                defaultMessage='Your Name'
              />
            </Label>
            <Input
              type='text'
              label='Name'
              name='name'
              value={ fname }
              onChange={(e) => setFirstName(e.target.value)}
              backgroundColor='#F7F7F7'
              height='48px'
            />
          </Col>

          <Col xs={12} sm={5} md={5} lg={5}>
            <Label>
              <FormattedMessage
                id='profileEmailField'
                defaultMessage='Your Email'
              />
            </Label>
            <Input
              type='email'
              name='email'
              label='Email Address'
              value={ email }
              onChange={(e) => setEmail(e.target.value)}
              backgroundColor='#F7F7F7'
            />
          </Col>
          {validation && validation.email ?
            <div style={{color: 'red'}}>{validation.email}</div> : null}
        </Row>
        <Row style={{ alignItems: 'flex-end', marginBottom: '50px' }}>
          <Col xs={12} sm={5} md={5} lg={5}>
            <Label>
              <FormattedMessage
                id='profileContactField'
                defaultMessage='Your Contact Number'
              />
            </Label>
            <Input
              type='contactno'
              name='contactno'
              label='Your Contact Number'
              value={phno}
              onChange={(e) => setContactno(e.target.value)}
              backgroundColor='#F7F7F7'
            />
          </Col>
          {validation && validation.phone ?
            <div style={{color: 'red'}}>{validation.phone}</div> : null}
        </Row>
        <Row style={{ alignItems: 'flex-end', marginBottom: '50px' }}>
          <Col xs={12} sm={2} md={2} lg={2}>
            <Button size='big' style={{ width: '100%' }} onClick={handleSave}>
              <FormattedMessage id='profileSaveBtn' defaultMessage='Save' />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} style={{ position: 'relative' }}>
            <SettingsFormContent>
              <Address />
            </SettingsFormContent>
          </Col>
        </Row>
      </SettingsFormContent>
    </SettingsForm>
  );
};

export default SettingsContent;
