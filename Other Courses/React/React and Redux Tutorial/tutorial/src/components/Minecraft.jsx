import React, { useEffect } from 'react'
import { connect } from "react-redux";
import diamondPNG from "../image/diamond.png";
import pickaxePNG from "../image/pickaxe.png";
import { mineDiamond } from "../store/diamond/actions";
import { getData } from "../store/users/actions";
import { getDiamond } from "../store/diamond/selector";
import { getUser } from "../store/users/selector";


const Minecraft = ({ diamond, addDiamonds, users, loading, error, getData }) => {
  useEffect(() => {
    getData();
  }, [])
  
  return (
    <div className="wrapper">
      <div className="wrapper__item">
        <img src={pickaxePNG} alt="" />
        <button onClick={() => addDiamonds(5)}>Mine</button>
      </div>

      <div className="wrapper__item">
        <img src={diamondPNG} alt="" />
        <span className="num">{diamond}</span>
        {loading ? (
          <h1 className="num">Loading...</h1>
        ) : (
          <h2 className="num">{users}</h2>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    diamond: getDiamond(state),
    users: getUser(state),
    loading: state.users.loading,
    error: state.users.error
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    addDiamonds: (increment) => dispatch(mineDiamond(increment)),
    getData: () => dispatch(getData())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Minecraft);