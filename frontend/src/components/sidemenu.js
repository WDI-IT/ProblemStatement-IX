/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'


function SideMenu(props) {

    let { setActiveMenu, activeMenu } = props;

    return (
        <aside className="column is-2 is-light is-fullheight section is-hidden-mobile">
            <p className="menu-label">
                General
                </p>
            <ul className="menu-list">
                <li><a
                    className={activeMenu === 'add' ? 'is-active' : ''}
                    onClick={() => setActiveMenu('add')}
                >Add</a></li>
                <li><a
                    className={activeMenu === 'edit' ? 'is-active' : ''}
                    onClick={() => setActiveMenu('edit')}
                >Edit</a></li>
                <li><a
                    className={activeMenu === 'listall' ? 'is-active' : ''}
                    onClick={() => setActiveMenu('listall')}
                >All Products</a></li>
            </ul>
        </aside>
    )
}

export default SideMenu
