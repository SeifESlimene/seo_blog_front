import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/category";
import Tag from "../../../components/crud/tag";

const Categorytag = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid"> 
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Categories And Tags</h2>
            </div>
            <div className="col-md-6">
              <Category />
            </div>
            <div className="col-md-6">
              <Tag />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Categorytag;
