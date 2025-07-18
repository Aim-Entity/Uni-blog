import React from 'react';
import withRouter from '../../Components/Common/withRouter';
import { Link } from 'react-router-dom';


const HorizontalLayout = (props : any) => {
    return (
        <React.Fragment>
            <div className="row justify-content-center mt-4 mb-4">
                <div className='col-xxl-10 m-0 w-25 d-flex justify-content-between align-items-center'>
                    <div className="">
                        <Link to="/blog-list"><h4 className="text-dark">Blogs</h4></Link>
                    </div>

                    <div className="">
                        <Link to="/blog-create"><h4 className="text-dark">Create A Blog</h4></Link>
                    </div>

                    <div className="">
                        <Link to="#"><h4 className="text-dark">Logout</h4></Link>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
};

export default withRouter((HorizontalLayout));