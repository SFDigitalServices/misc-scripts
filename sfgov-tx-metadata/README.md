# Background
Sf.gov intends to leverage 311's FunnelBack search platform in order to deliver a more unified search experience for San Francisco residents and visitors.

Sf.gov has a collection of transaction/service content types that contain detailed information regarding a San Francisco service (e.g. getting a birth certificate).  This detailed information is collected and curated from existing sfgov.org sites and from meeting in-person with relevant department personnel.  This can be a long process, so many of these services have been created in the cms, but lack the detailed information needed to replace the sources from sfgov.org.  To compensate, a direct external url to the source is used instead.

The business requirement for these situations (a service with a direct external url) is to redirect the resident directly to the service.  For the user, this is fine, but for FunnelBack, doing this means we lose all metadata related to the service/transaction content type.  Instead, FunnelBack will follow the direct external url and crawl the resulting page for a best guess at what the search result summary should be.  This can be any number of things: a metadata description tag (if it exists), an h1 tag, the first p tag encountered, etc.  These summaries are often incoherent and useless.

In order to use the summaries and descriptions created by the service content type in the cms, FunnelBack requires "external metadata."  This is exactly as it sounds - metadata for external urls.

# This script
This script creates an external metadata listing consummable by 311's FunnelBack search platform so that search results will use sf.gov descriptions and summaries instead.

## FunnelBack's External Metadata
This script relies on a rest url created through sf.gov's Drupal's core RESTful Web Services module.  This module exposes transactions created on sf.gov and this script parses the response and creates a text file containing a listing of external urls with kv pairs in a format that FunnelBack expects.  This output is then copy-pasted into FunnelBack's external metadata config form at `Dashboard --> Administer --> Browse Collection Configuration Files --> external_metadata.cfg` :scream:

## FunnelBack's Metamap
The keys used by this script are also predefined in FunnelBack.  These are called metadata classes and can be defined/configured at `Dashboard --> Administer --> Browse Collection Configuration Files --> metamap.cfg` :scream:

The keys defined in FunnelBack for use in this script are `sfgovTitle` and `sfgovSummary`

After these keys are defined, additional configuration is needed in order for FunnelBack to collect that metadata and send it back as part of the response when querying for search results.  This is configured in `Dashboard --> Administer --> Edit Collection Settings --> Interface --> Query processor options` :scream:

# More Information
Any additional information regarding FunnelBack is beyond the scope of this readme.  More information (and context) can be found at [https://docs.google.com/document/d/1FfMDHc5SQIwwBU34XmiXYGuyK1XGsuSyIAeTzhcNu88/edit#](https://docs.google.com/document/d/1FfMDHc5SQIwwBU34XmiXYGuyK1XGsuSyIAeTzhcNu88/edit#)