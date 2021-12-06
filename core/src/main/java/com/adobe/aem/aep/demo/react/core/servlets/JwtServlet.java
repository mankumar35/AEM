/*
 * Copyright 2015 Adobe Systems Incorporated
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
package com.adobe.aem.aep.demo.react.core.servlets;

import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * Servlet that writes some sample content into the response. It is mounted for all resources of a specific Sling
 * resource type. The {@link SlingSafeMethodsServlet} shall be used for HTTP methods that are idempotent. For write
 * operations use the {@link SlingAllMethodsServlet}.
 */
@Component(

        service = { Servlet.class },

        immediate = true,

        property = { "sling.servlet.extensions" + "=json", "sling.servlet.methods" + "=GET",

                "sling.servlet.paths" + "=/bin/adobe/data", "sling.servlet.selectors" + "=offer" })

public class JwtServlet extends SlingSafeMethodsServlet {

    private static final long serialVersionUID = 1L;

    @Reference
    private JwtService jwtService;

    @Override
    protected void doGet(final SlingHttpServletRequest req, final SlingHttpServletResponse resp)
            throws ServletException, IOException {

        final String apikey = "cc606f2b448b452cb18fa8d5a9936589";
        final String techact = "39D057F2619734CB0A495FAE@techacct.adobe.com";
        final String orgid = "D845731D5B30B6010A495E2E@AdobeOrg";
        final String clientsecret = "p8e-LN5qOrJt2D998moYaBfxVvMsczYFuELV";
        // String realm = config.getDomainRealm();
        final String access_token = jwtService.getAccessToken(req, apikey, techact, orgid, clientsecret);
        final String decision = jwtService.getDecisionOffer(access_token, apikey, orgid).toString();
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.getWriter().print(decision);
    }

}
