package point_in_the_plane.creator;

import point_in_the_plane.action.TheDistanceBetweenPoints;
import point_in_the_plane.entity.Point;

public class RunnerPoints {
    public static void main(String[] args){
        Point p = new Point(5.6, 1.25);
        Point q = new Point(0.3, -8.91);
        TheDistanceBetweenPoints theDistanceBetweenPoints = new TheDistanceBetweenPoints();
        theDistanceBetweenPoints.theDistanceBetweenPoints(p,q);
        System.out.println("Расстояние между точками " + p.toString()
                + " и " + q.toString() + " равно: " + theDistanceBetweenPoints.getDistance());
        theDistanceBetweenPoints.theDistanceBetweenPointsAndNull(p);
        System.out.println("Расстояние между точкой " + p.toString()
                + " и началом координат равно: " + theDistanceBetweenPoints.getDistance0());
        theDistanceBetweenPoints.theDistanceBetweenPointsAndNull(q);
        System.out.println("Расстояние между точкой " + q.toString()
                + " и началом координат равно: " + theDistanceBetweenPoints.getDistance0());
    }
}
