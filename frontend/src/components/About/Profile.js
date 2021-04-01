import React from 'react';
import styled from 'styled-components';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const Profile = ({ name, email, image, github, role }) => {
  const StyledProfile = styled.div`
    display: flex;
    flex-direction: column;
    width: 16rem;
  `;

  const DescWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-top: 0.6rem;
    padding-bottom: 1.2rem;
    height: 76%;
  `;

  const Info = styled.div`
    font-size: 0.8rem;
    align-items: center;
    display: flex;
    color: #666666;
    line-height: 1;

    @media only screen and (max-width: 768px) {
      font-size: 1rem;
    }

  `;

  const ProfileImage = styled.img`
    border-radius: 50%;
    width: 8rem;
    height: 8rem;
    object-fit: cover;
    margin-right: 0.8rem;
  `;

  const Name = styled.h3`
    margin: 0.25rem 0;
    font-size: 1rem;
    &:after {
      content: ' ${props => props.role}';
      font-size: 0.75rem;
      color: #444444;
    }
  `;

    return (
      <StyledProfile>
        <ProfileImage src={image} alt="profile image"/>
        <DescWrapper>
          <Name role={role}>{name}</Name>
          <Info><GitHubIcon fontSize="small" style={{transform: "scale(0.6)"}}/>{github}</Info>  
          <Info><MailOutlineIcon fontSize="small" style={{transform: "scale(0.6)"}} />{email}</Info>
        </DescWrapper>
      </StyledProfile>
    );
}

export default Profile;