function NavPage(props){
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <button
              className="btn btn-primary"
              onClick={() => props.setPage(props.page - 1)}
            >
              Back
            </button>
            <a className="navbar-brand">Page {props.page}</a>
            <button
              className="btn btn-primary"
              onClick={() => props.setPage(props.page + 1)}
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    );
}

export default NavPage;
