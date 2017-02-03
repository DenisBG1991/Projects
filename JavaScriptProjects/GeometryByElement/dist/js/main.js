$(document).ready(function () {
    window.scrollTo(300, 500);

    var a = window.pageXOffset,
        b = window.pageYOffset,

        c = document.documentElement.scrollLeft,
        d = document.documentElement.scrollTop,
        e = document.documentElement.scrollWidth,
        f = document.documentElement.scrollHeight,

        g = window.innerWidth,
        h = window.innerHeight,

        j = document.documentElement.clientWidth,
        k = document.documentElement.clientHeight,
        i = document.documentElement.clientLeft,
        l = document.documentElement.clientTop,

        m = document.documentElement.offsetParent,
        n = document.documentElement.offsetWidth,
        o = document.documentElement.offsetHeight,
        p = document.documentElement.offsetLeft,
        q = document.documentElement.offsetTop,

        s = window.scrollX,
        t = window.scrollY,
        u = window.scrollMaxX,
        v = window.scrollMaxY;

    console.log("window.pageXOffset = " + a +
        "\n" + "window.pageYOffset = " +  b +
        "\n" + "document.documentElement.scrollLeft = " + c +
        "\n" + "document.documentElement.scrollTop = " + d +
        "\n" + "=================================================" +
        "\n" + "document.documentElement.scrollWidth = " + e +
        "\n" + "document.documentElement.scrollHeight = " + f +
        "\n" + "=================================================" +
        "\n" + "window.innerWidth = " + g +
        "\n" + "window.innerHeight = " + h +
        "\n" + "document.documentElement.clientWidth = " + j +
        "\n" + "document.documentElement.clientHeight = " + k +
        "\n" + "=================================================" +
        "\n" + "document.documentElement.clientLeft = " + i +
        "\n" + "document.documentElement.clientTop = " + l +
        "\n" + "document.documentElement.offsetParent = " + m +
        "\n" + "document.documentElement.offsetWidth = " + n +
        "\n" + "document.documentElement.offsetHeight = " + o +
        "\n" + "document.documentElement.offsetLeft = " + p +
        "\n" + "document.documentElement.offsetTop = " + q +
        "\n" + "=================================================" +
        "\n" + "window.scrollX = " + s +
        "\n" + "window.scrollY = " + t +
        "\n" + "window.scrollMaxX = " + u +
        "\n" + "window.scrollMaxY = " + v +
        "\n" + "=================================================" +
        "\n" + "================================================="
    );

    var wrap = document.getElementsByClassName("wrapper")[0];

    var m_w = wrap.offsetParent,
        n_w = wrap.offsetWidth,
        o_w = wrap.offsetHeight,
        p_w = wrap.offsetLeft,
        q_w = wrap.offsetTop,

        j_w = wrap.clientWidth,
        k_w = wrap.clientHeight,
        i_w = wrap.clientLeft,
        l_w = wrap.clientTop,

        c_w = wrap.scrollLeft,
        d_w = wrap.scrollTop,
        e_w = wrap.scrollWidth,
        f_w = wrap.scrollHeight;

    console.log("wrap.offsetParent = " + m_w +
        "\n" + "wrap.offsetWidth = " +  n_w +
        "\n" + "wrap.offsetHeight = " + o_w +
        "\n" + "wrap.offsetLeft = " + p_w +
        "\n" + "wrap.offsetLeft = " + q_w +
        "\n" + "=================================================" +
        "\n" + "wrap.clientWidth = " +  j_w +
        "\n" + "wrap.clientHeight = " + k_w +
        "\n" + "wrap.clientLeft = " + i_w +
        "\n" + "wrap.clientTop = " + l_w +
        "\n" + "=================================================" +
        "\n" + "wrap.scrollWidth = " +  e_w +
        "\n" + "wrap.scrollHeight = " + f_w +
        "\n" + "wrap.scrollLeft = " + c_w +
        "\n" + "wrap.scrollTop = " + d_w +
        "\n" + "=================================================" +
        "\n" + "================================================="
    );

    var inn = document.getElementsByClassName("inner")[0];

    var m_n = inn.offsetParent,
        n_n = inn.offsetWidth,
        o_n = inn.offsetHeight,
        p_n = inn.offsetLeft,
        q_n = inn.offsetTop,

        j_n = inn.clientWidth,
        k_n = inn.clientHeight,
        i_n = inn.clientLeft,
        l_n = inn.clientTop,

        c_n = inn.scrollLeft,
        d_n = inn.scrollTop,
        e_n = inn.scrollWidth,
        f_n = inn.scrollHeight;

    console.log("inn.offsetParent = " + m_n +
        "\n" + "inn.offsetWidth = " +  n_n +
        "\n" + "inn.offsetHeight = " + o_n +
        "\n" + "inn.offsetLeft = " + p_n +
        "\n" + "inn.offsetLeft = " + q_n +
        "\n" + "=================================================" +
        "\n" + "inn.clientWidth = " +  j_n +
        "\n" + "inn.clientHeight = " + k_n +
        "\n" + "inn.clientLeft = " + i_n +
        "\n" + "inn.clientTop = " + l_n +
        "\n" + "=================================================" +
        "\n" + "inn.scrollWidth = " +  e_n +
        "\n" + "inn.scrollHeight = " + f_n +
        "\n" + "inn.scrollLeft = " + c_n +
        "\n" + "inn.scrollTop = " + d_n +
        "\n" + "================================================="
    );
});

