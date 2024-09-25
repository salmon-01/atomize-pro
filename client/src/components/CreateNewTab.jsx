import {React, useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Rocket from '../assets/icons/rocket-icon.png';
import Sprout from '../assets/icons/sprout-icon.png';
import Book from '../assets/icons/book-icon.png';
import Meal from '../assets/icons/meal-icon.png';
import MoneyBag from '../assets/icons/moneybag-icon.png';
import Star from '../assets/icons/star-icon.png';
import Barbell from '../assets/icons/barbell-icon.png';
import Sun from '../assets/icons/sun-icon.png';
import PiggyBank from '../assets/icons/piggybank-icon.png';
import Lightning from '../assets/icons/lightning-icon.png';
import Lightbulb from '../assets/icons/lightbulb-icon.png';
import PlaneGlobe from '../assets/icons/plane-globe-icon.png';
import {createTab} from '../ApiService.jsx';

export default function CreateNewTab({tabs}) {

    const navigate = useNavigate();

    const allIcons = [Sprout, Sun, PlaneGlobe, Book, Meal, Barbell, MoneyBag, PiggyBank, Star, Rocket, Lightning, Lightbulb]
    const [chosenIcon, setChosenIcon] = useState('');
    const [tabName, setTabName] = useState('');
    const [tabData, setTabData] = useState({name: tabName, icon: chosenIcon, col_one: null, col_one_b: null, col_two: null, col_two_b: null, col_three: null, col_three_b: null, order_no: tabs.length + 1})

    const handleTabNameChange = (event) => { setTabName(event.target.value) }

    const handleChooseIcon = (icon) => {
        setChosenIcon(icon)
    }

    const findPath = () => {
        return tabData.name.replace(/\s+/g, '-');
    }

    useEffect(() => {
        setTabData({...tabData, icon: chosenIcon});
      }, [chosenIcon])

    useEffect(() => {
        setTabData({...tabData, name: tabName});
      }, [tabName])

    const handleCreateTab = async(tab) => {
        if (!tabName) {
            alert('Please choose a name for your tab');
            return;
        }
        if (!chosenIcon) {
            alert('Please choose an icon');
            return;
        }
        try {
            await createTab(tab);
            console.log('New tab has been submitted succesfully');
            const path = findPath();
            navigate(`${path}`);
            window.location.reload();
        } catch (error) {
            console.log('Error submitting tab:', error);
        }       
    }

    return (
        <div className="new-tab-container">
            <span className="create-tab-text">Name your tab</span>
            <input type="text" id="name-tab" value={tabName} onChange={handleTabNameChange}></input>
            <span className="create-tab-text">Choose your tab icon:</span>
            <div className="icon-list">
                {allIcons.map((icon) => <img src={icon} className={`icon-choice ${chosenIcon === icon ? 'icon-chosen' : 'null'}`} onClick={() => {handleChooseIcon(icon)}}/>)}
            </div>
            <button id="submit-new-tab" onClick={()=> {handleCreateTab(tabData)}}>Create Tab</button>
        </div>
    )
}