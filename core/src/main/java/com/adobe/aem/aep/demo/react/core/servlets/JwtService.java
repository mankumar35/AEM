/**
 *
 */
package com.adobe.aem.aep.demo.react.core.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.security.KeyFactory;
import java.security.interfaces.RSAPrivateKey;
import java.security.spec.KeySpec;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.osgi.service.component.annotations.Component;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * @author mankumar35
 *
 */
@Component(service = JwtService.class, immediate = true)
public class JwtService {

    private static final String SERVER_FQDN = "mc.adobe.io";
    private static final String AUTH_SERVER_FQDN = "ims-na1.adobelogin.com";
    private static final String AUTH_ENDPOINT = "/ims/exchange/jwt/";

    /**
     * @param req
     * @param apikey
     * @param techact
     * @param orgid
     * @param clientsecret
     * @param access_token
     * @return
     */
    public String getAccessToken(final SlingHttpServletRequest req, final String apikey, final String techact,
            final String orgid, final String clientsecret) {
        String access_token = "";
        final HttpClient httpClient = HttpClientBuilder.create().build();
        final Long expirationTime = System.currentTimeMillis() / 1000 + 86400L;
        try {
            // Create the private key
            final String privatekeyString = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkr9JaGu3erKv+MxwyOjBBAAajbq5+OqH4P3JvUF0cStIu3n7uu2LL6RbiZr0RoZD9XPgvCv8ramZU/Sk+V3CfkAcH4WjSLKiyNJHoOlvQAwK3L92khsOWvMbLjiI4aCd2L1tsrzDoy7sCdMnGwBWaQNu+pOyPV5DANk879oaCaPnvUyeraY/4veox/72laV3GKd1TDHHOisSqzYyh7P0F+riEZjTxvLTzrtt41hy1xh/7rAFKPsB2Mn29XFtEZNmK9J0xnxH2HmS+jGNMHDmTauZOBUP364wJZuaPm810RVsn266StW/XROTbusc4AZKBe/qNIF+kUwMlmaanyffBAgMBAAECggEBAKG/KbtjvYK5Vsd4jVXrfp8ollyIBYtmrNP0BMG9TWXPOrXbwxFYK8WYLei4/TNG2u9tEzio9Us/2jfY2VwoZy3gOHeN9PSP9jPom/FY9/nKKy2eLnM8BPeUey9LbuK1sSRLiOCrBD9wcUENUWwKFm2FDA4nT0vNthaCgLmk/CExvQLqLe92lyx36VGxGCn5BDEXMK1PhV7dH6l2eGGjK4UQ6oY77N0XoNekencIP8zhXXBIKcb+DFcQbHBNsve6ujOqKT0suHZZczKeQXXK4zCnvlvcEhgKYJcbwvPiG1BB5LUc7vg1jFsEws7mIgUrXkKaRZNbkumVWGR8Ma/tyj0CgYEA92tRwJa1R8us07tHWYTg4BwgX03HubSCShOucOeXoho6jTNutHRdlK2KRVGLZrSMbJwXYKurSeNwGhUbQtHtZ2DVtrdUpRWKEOmaLRcFOYl9PvMa3X9h1NVos+s6dG4YXDo8pXbMYLI4i/h8d7nBj1xXsTnpP4M08UbzoKe+kZ8CgYEAqmX5Ei9koM68P0JoF5f7xOhBOLxitV0lc1yGZo7unZ0PZocztlY989sKMIGed6NNpiWI909Iji5zlEaJvu1AcAsKnfPGNXySvxCL6wOuBrPQfSmk+oJua+/Pf1Pp2CA1q5L8hOkYgDfR82YlHoppJ5aVyGrxUx7OQW3/BTlgup8CgYAjPAhPaeb1C39YQ8JccDzqDXdauyPnQVqQnA7qi0Cf2CZgd2OblTrCcphPWNaGUM3ypaP6o1foVNhhDoJsWKL7ZuHofGE0hUW9NNc89ptK31aTwWEhDAPtoFqhzKztacRUVgLO+YUPfDHrVP68uhpjhR4D4iBiaBgBCD6nsVvFNwKBgCeZ4WPfjdRtl4RgK47oLIQbsiS8a3hY+H4yD65AI6aPvOeIHnWO34EP8/NH/IszcbVeXdGUJHmexA++wP6VZvdjKYmCARunIveyocHxrf0yxw5/oi7yJzWAm0mtN9iZy79fPr6o6Z/K2UlnANNzOXMQ5SiZ6hH2Q9si9DTDm/5jAoGAJmb2uqif/JyvN+2HY2oP4fRf81P05k2H6Ebi+cyIpKqNz9BEl594pzHlEtwplcnZl1QD3/xpXgwvV+AmXK3DELJT4AVXYIKyp/854FOuW1OuR9j2LHTz0R5xzBZfskgD3vbCKyvz9mApozWMorKC+RWrW+xGXcntxY+1mtQpd3I=";
            final KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            final byte[] encodedBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(privatekeyString);
            final KeySpec ks = new PKCS8EncodedKeySpec(encodedBytes);
            final String metascopes[] = new String[] { "ent_dataservices_sdk" };
            final RSAPrivateKey privateKey = (RSAPrivateKey) keyFactory.generatePrivate(ks);
            final HashMap<String, Object> jwtClaims = new HashMap<>();
            jwtClaims.put("iss", orgid);
            jwtClaims.put("sub", techact);
            jwtClaims.put("exp", expirationTime);
            jwtClaims.put("aud", "https://" + AUTH_SERVER_FQDN + "/c/" + apikey);
            for (final String metascope : metascopes) {
                jwtClaims.put("https://" + AUTH_SERVER_FQDN + "/s/" + metascope, java.lang.Boolean.TRUE);
            }
            // Create the final JWT token
            final String jwtToken = Jwts.builder().setClaims(jwtClaims).signWith(SignatureAlgorithm.RS256, privateKey)
                    .compact();
            final HttpHost authServer = new HttpHost(AUTH_SERVER_FQDN, 443, "https");
            final HttpPost authPostRequest = new HttpPost(AUTH_ENDPOINT);
            authPostRequest.addHeader("Cache-Control", "no-cache");
            final List<NameValuePair> params = new ArrayList<NameValuePair>();
            params.add(new BasicNameValuePair("client_id", apikey));
            params.add(new BasicNameValuePair("client_secret", clientsecret));
            params.add(new BasicNameValuePair("jwt_token", jwtToken));
            authPostRequest.setEntity(new UrlEncodedFormEntity(params, Consts.UTF_8));
            final HttpResponse response = httpClient.execute(authServer, authPostRequest);
            if (200 != response.getStatusLine().getStatusCode()) {
                final HttpEntity ent = response.getEntity();
                throw new IOException("Server returned error: " + response.getStatusLine().getReasonPhrase());
            }
            final HttpEntity entity = response.getEntity();
            final JsonObject jo = new JsonParser().parse(EntityUtils.toString(entity)).getAsJsonObject();
            access_token = jo.get("access_token").getAsString();

        } catch (final Exception e) {
            e.printStackTrace();
        }
        return access_token;
    }

    public JsonObject getDecisionOffer(final String access_token, final String apikey, final String orgid) {
        JsonObject response = new JsonObject();
        try {
            final HttpClient client = HttpClientBuilder.create().build();
            final HttpPost post = new HttpPost(
                    "https://platform.adobe.io/data/core/ode/c9f63dfc-cae7-355f-80dc-5bfddde8462b/decisions");
            setRquestHeader(post, access_token, apikey, orgid);
            final JsonObject convertedObject = pouplateBody();
            post.setEntity(new StringEntity(convertedObject.toString(), ContentType.APPLICATION_JSON));

            final HttpResponse res = client.execute(post);
            final int ppResponse = res.getStatusLine().getStatusCode();
            if (ppResponse == HttpStatus.SC_OK) {
                String vResponse = StringUtils.EMPTY;
                BufferedReader rd;
                rd = new BufferedReader(new InputStreamReader(res.getEntity().getContent()));
                String line = "";
                final StringBuilder result = new StringBuilder();
                while ((line = rd.readLine()) != null) {
                    result.append(line);
                }
                vResponse = result.toString();
                response = new Gson().fromJson(vResponse, JsonObject.class);
            }
        } catch (final Exception e) {
            e.printStackTrace();
        }
        return response;
    }

    private JsonObject pouplateBody() throws IOException {

        final String json = "{\r\n" + "    \"xdm:propositionRequests\": [\r\n"
                + "            {\"xdm:activityId\":\"xcore:offer-activity:1450a31a3fe1dcf9\",\"xdm:placementId\":\"xcore:offer-placement:144ff11e017dc682\"},\r\n"
                + "            {\"xdm:activityId\":\"xcore:offer-activity:14567af735cd32ca\",\"xdm:placementId\":\"xcore:offer-placement:1456bc63acbd83fb\"}\r\n"
                + "        ],\r\n" + "    \"xdm:profiles\": [\r\n" + "        {\r\n"
                + "          \"xdm:identityMap\": {\r\n" + "            \"ECID\": [\r\n" + "            {\r\n"
                + "                \"xdm:id\": \"38914807724379303500755637099652659557\"\r\n" + "            }\r\n"
                + "            ]\r\n" + "        },\r\n"
                + "        \"xdm:decisionRequestId\": \"0AA00002-0000-1337-c0de-c0fefec0fefe\"\r\n" + "        }\r\n"
                + "    ],\r\n" + "    \"xdm:allowDuplicatePropositions\": {\r\n"
                + "        \"xdm:acrossActivities\": true,\r\n" + "        \"xdm:acrossPlacements\": true\r\n"
                + "    },\r\n" + "    \"xdm:mergePolicy\": {            \r\n"
                + "        \"xdm:id\": \"179e6e0a-8553-4570-9399-81d0b3c4ebb4\"\r\n" + "    },\r\n"
                + "    \"xdm:responseFormat\": {\r\n" + "        \"xdm:includeContent\": true,\r\n"
                + "        \"xdm:includeMetadata\": {\r\n" + "        \"xdm:activity\": [\r\n"
                + "            \"name\"\r\n" + "        ],\r\n" + "        \"xdm:option\": [\r\n"
                + "            \"name\"\r\n" + "        ],\r\n" + "        \"xdm:placement\": [\r\n"
                + "            \"name\"\r\n" + "        ]\r\n" + "        }\r\n" + "    }\r\n" + "}";
        final JsonObject jsonObject = new Gson().fromJson(json, JsonObject.class);
        return jsonObject;
    }

    /**
     * Populate header of request
     *
     * @param post
     * @param transactionRequestDto
     */
    private void setRquestHeader(final HttpPost post, final String accessToken, final String apikey,
            final String orgid) {

        post.addHeader("Accept",
                "application/vnd.adobe.xdm+json; schema=\"https://ns.adobe.com/experience/offer-management/decision-response;version=1.0\"");
        post.addHeader("x-api-key", apikey);
        post.addHeader("x-gw-ims-org-id", orgid);
        post.addHeader("Content-Type",
                "application/vnd.adobe.xdm+json; schema=\"https://ns.adobe.com/experience/offer-management/decision-request;version=1.0\"");
        post.addHeader("Authorization", "Bearer " + accessToken);
        post.addHeader("x-sandbox-name", "prod");

    }
}
