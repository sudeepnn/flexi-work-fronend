// Corrected content.tsx
import React from 'react';
import './content.css';


type Props = {};

const Content = (props: Props) => {
  return (
    <div className="content">
      { <div className="heading">
          <h2>
            Empower Your Workspace Journey: <br/>
            Seamlessly Manage Users, Workspaces, Events, and More
          </h2>
      </div> }

      
    </div>
  );
};

export default Content;
