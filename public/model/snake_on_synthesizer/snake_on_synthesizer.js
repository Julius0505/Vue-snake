"use strict"

// register the application module
b4w.register("snake_on_synthesizer_main", function(exports, require) {

// import modules used by the app
var m_app       = require("app");
var m_cfg       = require("config");
var m_data      = require("data");
var m_preloader = require("preloader");
var m_ver       = require("version");
var m_scene = require("scenes");
var m_material = require("material");

// detect application mode
var DEBUG = (m_ver.type() == "DEBUG");

// automatically detect assets path
var APP_ASSETS_PATH = m_cfg.get_assets_path("snake_on_synthesizer");

/**
 * export the method to initialize the app (called at the bottom of this file)
 */
exports.init = function() {
    m_app.init({
        canvas_container_id: "main_canvas_container",
        callback: init_cb,
        show_fps: DEBUG,
        console_verbose: DEBUG,
        autoresize: true,
        force_container_ratio: 1
    });
}

/**
 * callback executed when the app is initialized 
 */
function init_cb(canvas_elem, success) {

    if (!success) {
        console.log("b4w init failure");
        return;
    }

    m_preloader.create_preloader();

    // ignore right-click on the canvas element
    canvas_elem.oncontextmenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    load();
}

/**
 * load the scene data
 */
function load() {
    m_data.load("snake_on_synthesizer/assets/snake_on_synthesizer.json", load_cb, preloader_cb);
}

/**
 * update the app's preloader
 */
function preloader_cb(percentage) {
    m_preloader.update_preloader(percentage);
}

/**
 * callback executed when the scene data is loaded
 */
function load_cb(data_id, success) {

    if (!success) {
        console.log("b4w load failure");
        return;
    }

    m_app.enable_camera_controls();
    
    var annotations = [];
    annotations.push(m_scene.get_object_by_name("usb_port_anchor"));
    annotations.push(m_scene.get_object_by_name("nostrils_anchor"));
    annotations.push(m_scene.get_object_by_name("light_anchor"));
    annotations.push(m_scene.get_object_by_name("flexible_neck_anchor"));
    annotations.push(m_scene.get_object_by_name("belly_anchor"));
    annotations.push(m_scene.get_object_by_name("arrow_1"));
    annotations.push(m_scene.get_object_by_name("arrow_2"));
    annotations.push(m_scene.get_object_by_name("arrow_3"));
    annotations.push(m_scene.get_object_by_name("arrow_4"));
    annotations.push(m_scene.get_object_by_name("arrow_5"));
    var snake_opaque_parts = [];
    snake_opaque_parts.push(m_scene.get_object_by_name("snake_back"));
    snake_opaque_parts.push(m_scene.get_object_by_name("snake_neck"));
    snake_opaque_parts.push(m_scene.get_object_by_name("snake_head"));
    var cables = [];
    cables.push(m_scene.get_object_by_name("cable_1"));
    cables.push(m_scene.get_object_by_name("cable_2"));
    var anchor_buttons = document.querySelectorAll(".anchor-btn");
    var transparent_carrier = m_scene.get_object_by_name("transparent_mat");
    var snake_fallback_mat = m_scene.get_object_by_name("snake_tail");
    var coiledSnake = m_scene.get_object_by_name("coiled_snake");
    var coiledSnakeAnchor = m_scene.get_object_by_name("coiled_snake_anchor");
    var partsForHiding = [];
    partsForHiding.push(m_scene.get_object_by_name("head_downside"));
    partsForHiding.push(m_scene.get_object_by_name("long_neck"));
    partsForHiding.push(m_scene.get_object_by_name("pcb"));
    partsForHiding.push(m_scene.get_object_by_name("pcb_lights"));
    partsForHiding.push(m_scene.get_object_by_name("robber_neck"));
    partsForHiding.push(m_scene.get_object_by_name("snake_belly"));
    partsForHiding.push(m_scene.get_object_by_name("synthesizer"));
    partsForHiding.push(m_scene.get_object_by_name("usb_tongue"));
    partsForHiding.push(snake_fallback_mat);
    partsForHiding.push(transparent_carrier);
    partsForHiding.push(snake_opaque_parts[0]);
    partsForHiding.push(snake_opaque_parts[1]);
    partsForHiding.push(snake_opaque_parts[2]);
    var states = {
        isAnnotationsOpen: true,
        isSnakeOpaque: true,
        isCablesVisisble: true,
        isAllVisible: true,
        isCoiled: false
    };
    var hideOrShow = function(target, condition){
        if(states[condition])
        {
            target.forEach(function(element){
                m_scene.hide_object(element);
            });
            states[condition] = false;
        }
        else
        {
            target.forEach(function(element){
                m_scene.show_object(element);
            });
            states[condition] = true;
        }
    };
    var seeInside = function(){
        if(states["isSnakeOpaque"])
        {
            snake_opaque_parts.forEach(function(element){
                m_material.inherit_material(transparent_carrier, "transparent_mat", element, "plastic_body_mat");
            });
            states["isSnakeOpaque"] = false;
        }
        else
        {
            snake_opaque_parts.forEach(function(element){
                m_material.inherit_material(snake_fallback_mat, "plastic_body_mat", element, "plastic_body_mat");
            });
            states["isSnakeOpaque"] = true;
        }
    };
    for(var btn of anchor_buttons)
    {
        if(btn.id === "anchor_1_btn")
        {
            btn.addEventListener("click", function(){
                if(states["isAllVisible"])
                {
                    hideOrShow(partsForHiding, "isAllVisible");
                    if(states["isAnnotationsOpen"])
                    {
                        hideOrShow(annotations, "isAnnotationsOpen");
                    }
                    if(states["isCablesVisisble"])
                    {
                        hideOrShow(cables, "isCablesVisisble");
                    }
                    if(!states["isCoiled"])
                    {
                        hideOrShow([coiledSnake, coiledSnakeAnchor], "isCoiled");
                    }
                }
                else
                {
                    hideOrShow(partsForHiding, "isAllVisible");
                    if(!states["isCablesVisisble"])
                    {
                        hideOrShow(cables, "isCablesVisisble");
                    }
                    if(states["isCoiled"])
                    {
                        hideOrShow([coiledSnake, coiledSnakeAnchor], "isCoiled");
                    }
                }
            });
        }
        else if(btn.id === "anchor_2_btn")
        {
            btn.addEventListener("click", function(){
                hideOrShow(annotations, "isAnnotationsOpen");
            });
        }
        else if(btn.id === "anchor_3_btn")
        {
            btn.addEventListener("click", seeInside);
        }    
        else if(btn.id === "anchor_4_btn")
        {
            btn.addEventListener("click", function(){
                hideOrShow(cables, "isCablesVisisble");
            });
        }    
    }

    // place your code here

}


});

// import the app module and start the app by calling the init method
b4w.require("snake_on_synthesizer_main").init();
