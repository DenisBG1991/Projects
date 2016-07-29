package point_in_the_plane.action;

import point_in_the_plane.entity.Point;

public class TheDistanceBetweenPoints {
    private double distance;
    private double distance0;

    public void theDistanceBetweenPoints(Point p,Point q){
        double dis = Math.sqrt((p.getX()-q.getX())*(p.getX()-q.getX())+(p.getY()-q.getY())*(p.getY()-q.getY()));
        setDistance(dis);
    }

    public void theDistanceBetweenPointsAndNull(Point r){
        double dis0 =Math.sqrt(r.getX()*r.getX()+r.getY()*r.getY());
        setDistance0(dis0);
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public double getDistance0() {
        return distance0;
    }

    public void setDistance0(double distance0) {
        this.distance0 = distance0;
    }
}
