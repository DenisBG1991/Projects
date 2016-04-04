package treeModel;

import javax.swing.*;
import javax.swing.event.EventListenerList;
import javax.swing.event.TreeModelListener;
import javax.swing.tree.TreePath;
import java.awt.*;

public abstract class JComponentTreeModel {

    EventListenerList model_listeners;
    JComponent root_component = (JComponent)new JPanel();

    public JComponentTreeModel( JComponent _root ) {
        model_listeners = new EventListenerList();
        setRootComponent( _root );
    }
    public void setRootComponent( JComponent _root ) {
        if( null != _root )
        {
            root_component = _root;
            reload(root_component);
        }
    }
    public void reload(JComponent root_component) {
        reload(this.root_component);
    }


    public Object getRoot(){
        return root_component;
    }
    public Object getChild(Object parent, int index){
        return ((Container)parent). getComponent( index );
    }
    public int getChildCount(Object parent){
        if ( null == parent ){
            return 0;
        }
        return ((Container)parent). getComponentCount();
    }
    public boolean isLeaf(Object parent){
        return 0 == getChildCount( parent );
    }
    public int getIndexOfChild(Object parent, Object Child){
        for ( int i=0; i< ((Container)parent).getComponentCount(); i++){
            if( Child == ((Container)parent).getComponent(i) )
                return i;
        }
        return 0;
    }


    public abstract void addTreeModelListener(TreeModelListener _listener);
    public abstract void removeTreeModelListener(TreeModelListener _listener);
    public abstract void valueForPathChanged(TreePath path, Object newValue);
}
