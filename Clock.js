class Clock {

    constructor(el) {
        let bigMarkLength = 20;
        let smallMarkLength = 10;
        let clockRadius = 100;
        this.hourHandSize = 50;
        this.minHandSize = 75;
        this.secHandSize = 75;
        this.over=12;

        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");
        svg.setAttributeNS(null, 'viewBox', (-clockRadius) + ',' + (-clockRadius) + ',' + (2*clockRadius) + ',' + (2*clockRadius));
        svg.setAttributeNS(null, 'class', 'Clock');

        let tmp1 = clockRadius - bigMarkLength;
        let tmp2 = clockRadius - smallMarkLength;
        let tmp3 = 2*Math.PI/60;
        for (let i=0; i<60; i++) {
            if (i%5 == 0) {
                let element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                element.setAttributeNS(null, 'x1', Math.cos(i*tmp3)*tmp1);
                element.setAttributeNS(null, 'y1', Math.sin(i*tmp3)*tmp1);
                element.setAttributeNS(null, 'x2', Math.cos(i*tmp3)*clockRadius);
                element.setAttributeNS(null, 'y2', Math.sin(i*tmp3)*clockRadius);
                element.setAttributeNS(null, 'class', 'bigMark');
                svg.appendChild(element);
            } else {
                let element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                element.setAttributeNS(null, 'x1', Math.cos(i*tmp3)*tmp2);
                element.setAttributeNS(null, 'y1', Math.sin(i*tmp3)*tmp2);
                element.setAttributeNS(null, 'x2', Math.cos(i*tmp3)*clockRadius);
                element.setAttributeNS(null, 'y2', Math.sin(i*tmp3)*clockRadius);
                element.setAttributeNS(null, 'class', 'smallMark');
                svg.appendChild(element);
            }
        }

        this.hourHand = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.hourHand.setAttributeNS(null, 'x1', 0);
        this.hourHand.setAttributeNS(null, 'y1', -this.over);
        this.hourHand.setAttributeNS(null, 'x2', 0);
        this.hourHand.setAttributeNS(null, 'y2', this.hourHandSize);
        this.hourHand.setAttributeNS(null, 'class', 'hourHand');
        svg.appendChild(this.hourHand);

        this.minHand = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.minHand.setAttributeNS(null, 'x1', 0);
        this.minHand.setAttributeNS(null, 'y1', -this.over);
        this.minHand.setAttributeNS(null, 'x2', 0);
        this.minHand.setAttributeNS(null, 'y2', this.minHandSize);
        this.minHand.setAttributeNS(null, 'class', 'minHand');
        svg.appendChild(this.minHand);

        this.secHand = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.secHand.setAttributeNS(null, 'x1', 0);
        this.secHand.setAttributeNS(null, 'y1', 0);
        this.secHand.setAttributeNS(null, 'x2', 0);
        this.secHand.setAttributeNS(null, 'y2', this.secHandSize);
        this.secHand.setAttributeNS(null, 'class', 'secHand');
        svg.appendChild(this.secHand);

        el.appendChild(svg);

        this.setTime();
    }

    setTime() {
        let t = new Date();
        let h = t.getHours()%12 + t.getMinutes()/60;
        let m = t.getMinutes();
        let s = t.getSeconds();

        this.hourHand.setAttributeNS(null, 'x1', Math.cos(2*h*Math.PI/12 - Math.PI/2)*(-this.over));
        this.hourHand.setAttributeNS(null, 'y1', Math.sin(2*h*Math.PI/12 - Math.PI/2)*(-this.over));
        this.hourHand.setAttributeNS(null, 'x2', Math.cos(2*h*Math.PI/12 - Math.PI/2)*this.hourHandSize);
        this.hourHand.setAttributeNS(null, 'y2', Math.sin(2*h*Math.PI/12 - Math.PI/2)*this.hourHandSize);

        this.minHand.setAttributeNS(null, 'x1', Math.cos(2*m*Math.PI/60 - Math.PI/2)*(-this.over));
        this.minHand.setAttributeNS(null, 'y1', Math.sin(2*m*Math.PI/60 - Math.PI/2)*(-this.over));
        this.minHand.setAttributeNS(null, 'x2', Math.cos(2*m*Math.PI/60 - Math.PI/2)*this.minHandSize);
        this.minHand.setAttributeNS(null, 'y2', Math.sin(2*m*Math.PI/60 - Math.PI/2)*this.minHandSize);

        this.secHand.setAttributeNS(null, 'x2', Math.cos(2*s*Math.PI/60 - Math.PI/2)*this.secHandSize);
        this.secHand.setAttributeNS(null, 'y2', Math.sin(2*s*Math.PI/60 - Math.PI/2)*this.secHandSize);
    }

    start() {
        this.setTime();
        window.requestAnimationFrame(this.start.bind(this));
    }
}
