import React, { useEffect } from 'react'
import { connect } from "react-redux";
import diamondPNG from "../image/diamond.png";
import pickaxePNG from "../image/pickaxe.png";
import { mineDiamond } from "../store/diamond/actions";
import { getData } from "../store/users/actions";
import { getDiamond } from "../store/diamond/selector";
import { getUser } from "../store/users/selector";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


const Minecraft_Hooks = () => {
  const loading = useSelector(state => state.users.loading);
  const users = useSelector(state => state.users.users);
  const diamond = useSelector(state => state.diamond.diamonds, (prev, curr) => {
    if (prev === curr) {
      console.log("true");
    } else {
      console.log("false");
    }
  });
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getData());
  }, [])
  
  return (
    <div className="wrapper">
      <div className="wrapper__item">
        <img src={pickaxePNG} alt="" />
        <button onClick={() => dispatch(mineDiamond(5))}>Mine</button>
      </div>

      <div className="wrapper__item">
        <img src={diamondPNG} alt="" />
        <span className="num">{diamond}</span>
        {loading ? (
          <h1 className="num">Loading...</h1>
        ) : (
          users.map((user) => (
            <h2 key={user.id} className="num">
              {user.name}
            </h2>
          ))
        )}
      </div>
    </div>
  );
};

export default Minecraft_Hooks;